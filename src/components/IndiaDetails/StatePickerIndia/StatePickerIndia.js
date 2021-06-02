import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./StatePickerIndia.module.css";
import { fetchIndiaStates } from "../../../api";

const StatePickerIndia = ({ handleIndiaStateChange }) => {
  const [fetchedIndiaStates, setFetchedIndiaStates] = useState([]);

  useEffect(() => {
    const fetchIndiaStatesAPI = async () => {
      setFetchedIndiaStates(await fetchIndiaStates());
    };

    fetchIndiaStatesAPI();
  }, [setFetchedIndiaStates]);

  return (
    <div className={styles.formDiv}>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => {
            handleIndiaStateChange(e.target.value);
          }}
        >
          <option value="">India's Total Cases</option>
          {fetchedIndiaStates.map((states, i) => (
            <option key={i} value={states}>
              {states}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default StatePickerIndia;
