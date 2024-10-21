"use client";
import * as React from "react";
import { Field, SearchBoxChangeEvent } from "@fluentui/react-components";
import { SearchBox } from '@fluentui/react-components';
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CompanySearch() {



  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(event: SearchBoxChangeEvent, data: { value: string }) {
    const term = data.value;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (

    <Field
      label="Name of company"
    // validationState={valid ? "none" : "warning"}
    // validationMessage={valid ? "" : "Input is limited to 20 characters."}
    >
      <SearchBox onChange={handleSearch} defaultValue={searchParams.get('query')?.toString()}
      />
    </Field>


  );
};