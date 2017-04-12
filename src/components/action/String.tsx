import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import { StringQuestion } from "../../questions";
import { GenericProps } from "./Generic";


interface StringProps extends GenericProps {
  question: StringQuestion;
}

export class String extends React.Component<StringProps, {}> {
  render() {
    return (
      <Field
          key={`${this.props.pageKey}.${this.props.question.key}`}
          name={`${this.props.pageKey}.${this.props.question.key}`}
          component={TextField}
      />
    );
  }
}
