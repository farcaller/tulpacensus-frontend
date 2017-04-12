import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import { NumberQuestion } from "../../questions";
import { GenericProps } from "./Generic";


interface NumberProps extends GenericProps {
  question: NumberQuestion;
}

export class Number extends React.Component<NumberProps, {}> {
  render() {
    return (
      <Field
          key={`${this.props.pageKey}.${this.props.question.key}`}
          name={`${this.props.pageKey}.${this.props.question.key}`}
          component={TextField}
          type="number"
      />
    );
  }
}
