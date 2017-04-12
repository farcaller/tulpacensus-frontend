import * as React from "react";
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card";

import * as A from "./action/Action";
import * as Q from "../questions";
import * as Style from "../style";


export interface QuestionCardProps {
  question: Q.QuestionsEnum;
  pageKey: string;
}

export class QuestionCard extends React.Component<QuestionCardProps, {}> {
  constructor(props: QuestionCardProps) {
    super(props);
  }

  render() {
    let action: JSX.Element;

    switch (this.props.question.type) {
      case "number":
        action = <A.Number question={this.props.question as Q.NumberQuestion} pageKey={this.props.pageKey} />;
        break;
      case "pick-many":
        action = <A.PickMany question={this.props.question as Q.PickManyQuestion} pageKey={this.props.pageKey} />;
        break;
      case "pick-one":
        action = <A.PickOne question={this.props.question as Q.PickOneQuestion} pageKey={this.props.pageKey} />;
        break;
      case "country":
        action = <A.Country question={this.props.question as Q.CountryQuestion} pageKey={this.props.pageKey} />;
        break;
      case "string":
        action = <A.String question={this.props.question as Q.StringQuestion} pageKey={this.props.pageKey} />;
        break;
      default:
        throw new RangeError("Unknown question type " + (this.props.question as Q.GenericQuestion).type);
    }

    return (
      <Card style={Style.card}>
        <CardTitle title={this.props.question.title} />
        {this.props.question.help &&
            <CardText>
              {this.props.question.help}
              {this.props.question.morehelp &&
                  <b>&nbsp;{this.props.question.morehelp}</b>
              }
            </CardText>
        }
        <CardActions>
          {action}
        </CardActions>
      </Card>
    );
  }
}
