import * as React from "react";
import MenuItem from "material-ui/MenuItem";
import { Field, reduxForm } from "redux-form";
import { SelectField } from "redux-form-material-ui";

import { CountryQuestion } from "../../questions";
import { Countries } from "../../countries";
import { GenericProps } from "./Generic";


interface CountryProps extends GenericProps {
  question: CountryQuestion;
}

export class Country extends React.Component<CountryProps, {}> {
  render() {
    return (
      <Field
          name={`${this.props.pageKey}.${this.props.question.key}`}
          component={SelectField}
          fullWidth
      >
        {Countries.map(function(c) {
          return <MenuItem key={c.countryShortCode} value={c.countryShortCode} primaryText={c.countryName} />;
        })}
      </Field>
    );
  }
}
