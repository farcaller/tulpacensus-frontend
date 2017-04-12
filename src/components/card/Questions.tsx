import * as React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";

import * as Style from "../../style";
import { Questions, QuestionsPage as QP } from "../../questions";
import { QuestionCard } from "../QuestionCard";

const selector = formValueSelector("questionnaire");

function mapStateToQuestionsPageProps(state: any): any {
  return {
    formKey: (k) => selector(state, k),
  };
}

@reduxForm({form: "questionnaire", name: "questionnaire", destroyOnUnmount: false})
class QuestionsPageWrap extends React.Component<any, {}> {
  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;

    let page = this.props.params.page;
    let pageData: QP;
    let pageKey: string;
    if (page) {
      pageData = Questions[page];
      pageKey = pageData.key;
    } else {
      let tulpa = +this.props.params.tulpa;
      if (tulpa) {
        pageData = Questions["tulpa_questions"];
        pageKey = `tulpa[${(+tulpa) - 1}]`;
      } else {
        return <div></div>;
      }
    }

    let questions = [];
    for (const q of pageData.questions) {
      if (q.showif) {
        const split = q.showif.split(":", 2);
        const [showIfKey, showIfVal] = split;

        const formPage = this.props.formKey(pageKey);
        if (formPage) {
          const keyVal = formPage[showIfKey];
          if (keyVal == showIfVal) {
            questions.push(<QuestionCard key={q.key} pageKey={pageKey} question={q} />);
          }
        }
      } else {
        questions.push(<QuestionCard key={q.key} pageKey={pageKey} question={q} />);
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        {pageData.help &&
          <Card style={Style.card}>
            <CardText>{pageData.help}</CardText>
          </Card>
        }
        {questions}
      </form>
    );
  }
}

export const QuestionsPage = connect(mapStateToQuestionsPageProps)(QuestionsPageWrap);
