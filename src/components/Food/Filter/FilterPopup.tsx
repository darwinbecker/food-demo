import React, { useEffect, useState } from "react";
import { TagAutocomplete } from "./TagAutocomplete";
import { TagSelectType, TagSelectionTypes } from "./TagSelectType";
import { FoodItem, ImgItem, Tag, TagRelation } from '../../../Interface';
import * as _ from "lodash";
import { fetchTagRelation, fetchFoodItem, fetchFoodItemImg } from '../../../fetch/FetchData';
import foodData from '../../../data/databaseFood.json'
import foodDataIcons from '../../../data/databaseFoodIcons.json';
import foodtags from '../../../data/databaseTags.json';
import foodtagsRelation from '../../../data/databaseTagsRelation.json';

interface FilterPopupProps {
  setSearchresults: Function;
  serverOnline: boolean;
};
interface FilterPopupState {
  tagsFilter: Tag[];
  selectedTags: Tag[];
  tagType: string;
}

export const FilterPopup: React.FC<FilterPopupProps> = (props: FilterPopupProps) => {
  const [tags, setTags] = useState<FilterPopupState["tagsFilter"]>([]);
  const [selectedTags, setSelectedTags] = useState<FilterPopupState["selectedTags"]>([]);
  const [tagType, setTagType] = useState<FilterPopupState["tagType"]>("intersection");


  useEffect(() => {
    async function fetchTags() {
      try {
        const response: Tag[] = await (await fetch('http://127.0.0.1:8080/tags')).json();
        setTags(response);
      } catch (error) {
        setTags(foodtags);
      }
    }
    fetchTags()
  }, [])

  const updateSelectedTags = (tags: Tag[]) => {
    setSelectedTags(tags);
  }

  const updateTagType = (tagType: string | null) => {
    if (tagType !== null) {
      setTagType(tagType);
    }
  }

  const filterUniqueItems = (foodItems: FoodItem[]): FoodItem[] => {
    const results: FoodItem[] = [];
    const map = new Map();
    for (const item of foodItems) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        results.push(item);
      }
    }
    return results;
  }

  const filterIntersectItems = (foodItems2D: number[][]): number[] => {
    const results: number[] = foodItems2D.reduce((a: number[], b: number[]) => a.filter((c: number) => b.includes(c)));
    return results;
  }

  const getLocalFoodData = () => {
    let tagsRelationID2d: number[][] | number[] = selectedTags.map((selectedItem: Tag) => {
      const tagRelationArr: TagRelation[] = foodtagsRelation.filter((item: TagRelation) => {
        return item.tagID == selectedItem.id;
      });

      const tagRelationIDs: number[] = [];
      tagRelationArr.map((tagRel: TagRelation) => {
        tagRelationIDs.push(tagRel.foodID);
      });
      return tagRelationIDs;
    });


    if (tagType == "intersection") {
      tagsRelationID2d = filterIntersectItems(tagsRelationID2d) as number[];
    }

    const selectedTagRelation: number[] = _.flatten(tagsRelationID2d);

    const foodItems: FoodItem[] = selectedTagRelation.map((foodID: number) => {
      const foodItem: FoodItem = (foodData as FoodItem[]).find((item: FoodItem) => item.id === foodID) as FoodItem;
      const foundFoodItem: ImgItem = (foodDataIcons as ImgItem[]).find((arrayItem: ImgItem) => arrayItem.id === foodItem.id) as ImgItem;
      if (foundFoodItem !== undefined) {
        const encodedImg: string = window.btoa(String.fromCharCode(...new Uint8Array(foundFoodItem.img.data)));
        const encodedImgLink = "data:image/svg+xml;base64," + encodedImg;
        foodItem.img = encodedImgLink;
      }
      return foodItem;
    });

    return filterUniqueItems(foodItems);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.serverOnline) {
      // let tagsRelationID2d: number[][] | number[] = [[]];
      try {
        let tagsRelationID2d: number[][] | number[] = await Promise.all(
          selectedTags.map(async (item: Tag) => {
            const tagRelationArr: TagRelation[] = await fetchTagRelation(item.id);
            const tagRelationIDs: number[] = [];
            tagRelationArr.map((tagRel: TagRelation) => {
              tagRelationIDs.push(tagRel.foodID);
            });
            return tagRelationIDs;
          })
        );

        if (tagType == "intersection") {
          tagsRelationID2d = filterIntersectItems(tagsRelationID2d) as number[];
        }

        const selectedTagRelation: number[] = _.flatten(tagsRelationID2d);

        const foodItems: FoodItem[] = await Promise.all(
          selectedTagRelation.map(async (foodID: number) => {
            const foodItem: FoodItem = await fetchFoodItem(foodID);
            const img: string = await fetchFoodItemImg(foodItem.id);
            const encodedImg = window.btoa(img);
            const encodedImgLink = "data:image/svg+xml;base64," + encodedImg;
            foodItem.img = encodedImgLink;
            return foodItem;
          })
        );

        const uniqueItems = filterUniqueItems(foodItems);
        props.setSearchresults(uniqueItems);
      } catch (error) {
        const uniqueItems = getLocalFoodData();
        props.setSearchresults(uniqueItems);
      }
    } else {
      const uniqueItems = getLocalFoodData();
      props.setSearchresults(uniqueItems);
    }

  }

  return (
    <div className="FilterPopup">
      <form onSubmit={handleSubmit}>
        <div className="filterTags">
          <TagAutocomplete tags={tags} setSelectedTags={updateSelectedTags}></TagAutocomplete>
        </div>
        <div className="filterTags">
          {/* type={["Tag-Intersection", "Tag-Union"]} */}
          <TagSelectType tagType={tagType} setTagType={updateTagType}></TagSelectType>
        </div>
        <div className="filterTags">
          <button type="submit">Apply</button>
        </div>
      </form>
    </div>
  )
}