import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { RadioButton } from "material-ui/RadioButton";
import { RadioButtonGroup, TextField } from "redux-form-material-ui";

import { PickOneQuestion } from "../../questions";
import { GenericProps } from "./Generic";


interface PickOneProps extends GenericProps {
  question: PickOneQuestion;
}

interface PickOneState {
  other: boolean;
}

const style = {
  marginBottom: "10px",
};

class RadioButtonGroupWrapper extends React.Component<any, any> {
  render() {
    return (
      <RadioButtonGroup {...this.props} onChange={(evt, val) => {this.props.onChangeWrapper(val);}} />
    );
  }
}

export class PickOne extends React.Component<PickOneProps, PickOneState> {
  constructor(props: PickOneProps) {
    super(props);

    this.state = {other: false};
  }

  valueChanged = (evt, value) => {
    if (value === "other") {
      this.setState({other: true});
    } else {
      this.setState({other: false});
    }
  }

  componentDidMount() {
    this.setState({other: (this.refs[this.props.question.key] as any).value === "other"});
  }

  render() {
    let elements = this.props.question.values.map(
        v => <RadioButton key={`${this.props.pageKey}.${v.key}`} value={v.key} label={v.title} style={style}/>
    );

    if (this.props.question.other) {
      elements.push(<RadioButton key="other" value="other" label="Other" style={style}/>);
    }

    return (
      <div>
        <Field
            name={`${this.props.pageKey}.${this.props.question.key}`}
            component={(props) => {
              let change = (evt, value) => {
                this.valueChanged(evt, value);
                props.input.onChange(evt, value);
              };
              return <RadioButtonGroup
                  {...props}
                  valueSelected={props.input.value}
                  onChange={change}
              />;
            }}
            ref={this.props.question.key}
        >
          {elements}
        </Field>
        {this.state.other && <Field
            name={`${this.props.pageKey}.${this.props.question.key}_other`}
            component={TextField}
            floatingLabelText="Provide your own value"
            fullWidth
        />}
      </div>
    );
  }
}
