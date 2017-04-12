import * as React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { RadioButton } from "material-ui/RadioButton";
import { Checkbox, TextField } from "redux-form-material-ui";
import { connect } from "react-redux";

import { PickManyQuestion } from "../../questions";
import { GenericProps } from "./Generic";


interface PickManyProps extends GenericProps {
  question: PickManyQuestion;
  formKey?: (any) => any;
}

interface PickManyState {
}

const style = {
  marginBottom: "10px",
};

const selector = formValueSelector("questionnaire");

function mapStateToQuestionsPageProps(state: any): any {
  return {
    formKey: (k) => selector(state, k),
  };
}

class PickManyWrap extends React.Component<PickManyProps, PickManyState> {
  render() {
    let elements: JSX.Element[] = [];

    for (let q of this.props.question.values) {
      elements.push(<Field
          key={`${this.props.pageKey}.${this.props.question.key}.${q.key}`}
          name={`${this.props.pageKey}.${this.props.question.key}.${q.key}`}
          component={Checkbox}
          label={q.title}
          style={style}
      />);
    }

    return (
      <div>
        {elements}

        {this.props.question.other && <Field
            name={`${this.props.pageKey}.${this.props.question.key}.other`}
            component={Checkbox}
            label="Other"
            style={style}
        />}

        {this.props.formKey(`${this.props.pageKey}.${this.props.question.key}.other`) && <Field
            name={`${this.props.pageKey}.${this.props.question.key}_other`}
            component={TextField}
            floatingLabelText="Other"
            fullWidth
        />}
      </div>
    );
  }
}

export const PickMany = connect(mapStateToQuestionsPageProps)(PickManyWrap);
