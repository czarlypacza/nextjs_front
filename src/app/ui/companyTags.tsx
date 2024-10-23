"use client";
import * as React from "react";
import {
  TagPicker,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerGroup,
  TagPickerOption,
  useTagPickerFilter,
  TagPickerList,
} from "@fluentui/react-components";
import { Tag, Avatar, Field } from "@fluentui/react-components";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


const options = [
  "Bank",
  "Car dealer",
  "Jewelry store",
  "Travel insurance company",
  "Furniture store",
  "Clothing store",
  "Fitness and nutrition service",
  "Insurance agency",
  "Mortgage broker",
  "Real estate agents",
  "Womens clothing store",
];

export const CompanyTags = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = React.useState<string>("");
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(searchParams.get('tags')?.split(',') || []);

  const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
    if (data.value === "no-matches") {
      return;
    }
    setSelectedOptions(data.selectedOptions);
    const params = new URLSearchParams(searchParams);

    if (data.selectedOptions.length > 0) {
      params.set('tags',data.selectedOptions.join(','));
    }else{
      params.delete('tags');
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };
  // const handleKeyDown = (event: React.KeyboardEvent) => {
  //   if (event.key === "Enter" && inputValue) {
  //     setInputValue("");
  //     setSelectedOptions((curr) =>
  //       curr.includes(inputValue) ? curr : [...curr, inputValue]
  //     );
  //   }
  // };

  const children = useTagPickerFilter({
    query,
    options,
    noOptionsElement: (
      <TagPickerOption value="no-matches">
        No matches found.
      </TagPickerOption>
    ),
    renderOption: (option) => (
      <TagPickerOption
        key={option}
        media={
          <Avatar shape="square" aria-hidden name={option} color="colorful" />
        }
        value={option}
      >
        {option}
      </TagPickerOption>
    ),

    filter: (option) =>
      !selectedOptions.includes(option) &&
      option.toLowerCase().includes(query.toLowerCase()),
  });

  return (
    <Field label="Categories" >
      <TagPicker
        
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
        inline={true}
      >
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees" >
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            value={query}
            onChange={handleChange}
            aria-label="Add Employees"
          />
        </TagPickerControl>

        <TagPickerList style={{zIndex:"11",position:"absolute"}} >
          {children}
        </TagPickerList>

      </TagPicker>
    </Field>
  );
};