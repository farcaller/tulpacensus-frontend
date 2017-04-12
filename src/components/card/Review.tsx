import * as React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as Style from "../../style";
import * as Q from "../../questions";
import { Countries } from "../../countries";


let contryMap = {};
for (const c of Countries) {
  contryMap[c.countryShortCode] = c.countryName;
}

function mapStateToReviewPageProps(state: any): any {
  return { formValues: state.form.questionnaire.values };
}

class ReviewPage extends React.Component<any, {}> {
  renderQuestion(q: Q.GenericQuestion, formPage: any) {
    const val = formPage[q.key];
    switch (q.type) {
      case "number":
        return val;
      case "pick-many":
        const qm = q as Q.PickManyQuestion;
        let vals = [];
        for (const qv of qm.values) {
          if (val[qv.key]) {
            vals.push(<li key={qv.key}>{qv.title}</li>);
          }
        }
        if (qm.other && formPage[`${q.key}_other`]) {
          vals.push(<li key="other">{formPage[`${q.key}_other`]}</li>);
        }
        return <ul style={Style.reviewList}>{vals}</ul>;
      case "pick-one":
        const qo = q as Q.PickOneQuestion;
        if (qo.other && val === "other") {
          return formPage[`${q.key}_other`];
        }
        return qo.values.filter((i) => i.key === val)[0].title;
      case "boolean":
        return val ? "yes" : "no";
      case "country":
        return contryMap[val];
      case "string":
        return val;
      default:
        throw new RangeError("Unknown question type " + (this.props.question as Q.GenericQuestion).type);
    }
  }

  renderQuestionPage(key: string) {
    let contents = null;
    if (!this.props.formValues[key]) {
      contents = <em style={Style.unfinishedQuestions}>nothing filled in</em>;
    } else {
      let questions = [];
      for (const q of Q.Questions[key].questions) {
        if (q.showif) {
          const split = q.showif.split(":", 2);
          const showIfKey = split[0];
          const showIfVal = split[1];

          const formPage = this.props.formValues[key];
          if (formPage) {
            const keyVal = formPage[showIfKey];
            if (keyVal != showIfVal) {
              continue;
            }
          }
        }

        questions.push(<dt key={q.key + "-dt"}>{q.title}</dt>);
        if (this.props.formValues[key][q.key] !== undefined) {
          questions.push(<dd key={q.key + "-dd"}>{this.renderQuestion(q, this.props.formValues[key])}</dd>);
        } else {
          questions.push(<dd key={q.key + "-dd"}><em style={Style.unfinishedQuestions}>not specified</em></dd>);
        };
      }
      contents = <dl>{questions}</dl>;
    }
    return (
      <div key={key}>
        <h2>{Q.Questions[key].title}</h2>
        {contents}
      </div>
    );
  }

  countSkipped(key: string) {
    if (!this.props.formValues[key]) {
      return 1;
    } else {
      let unfinished = 0;
      for (const q of Q.Questions[key].questions) {
        if (q.showif) {
          const split = q.showif.split(":", 2);
          const showIfKey = split[0];
          const showIfVal = split[1];

          const formPage = this.props.formValues[key];
          if (formPage) {
            const keyVal = formPage[showIfKey];
            if (keyVal != showIfVal) {
              continue;
            }
          }
        }

        if (this.props.formValues[key][q.key] === undefined) {
          unfinished++;
        };
      }
      return unfinished;
    }
  }

  renderTulpas() {
    let contents = [];
    if (!this.props.formValues["tulpa"]) {
      return;
    }
    const tulpas = this.props.formValues["tulpa"];
    for (let i = 0; i < tulpas.length; ++i) {
      const tulpa = tulpas[i];
      let tulpa_name = `Tulpa ${i + 1}`;
      if (tulpa["name_dont_save"]) {
        tulpa_name += ": " + tulpa["name_dont_save"];
      }
      contents.push(<h2 key={tulpa_name}>{tulpa_name}</h2>);

      let questions = [];
      for (const q of Q.Questions["tulpa_questions"].questions) {
        if (q.showif) {
          const split = q.showif.split(":", 2);
          const showIfKey = split[0];
          const showIfVal = split[1];

          const keyVal = tulpa[showIfKey];
          if (keyVal != showIfVal) {
            continue;
          }
        }

        questions.push(<dt key={q.key + "-dt"}>{q.title}</dt>);
        if (tulpa[q.key]) {
          questions.push(<dd key={q.key + "-dd"}>{this.renderQuestion(q, tulpa)}</dd>);
        } else {
          questions.push(<dd key={q.key + "-dd"}><em style={Style.unfinishedQuestions}>not specified</em></dd>);
        };
      }
      contents.push(<dl key={i}>{questions}</dl>);
    }
    return (
      <div key="tulpas">
        {contents}
      </div>
    );
  }

  countSkippedTulpas() {
    let unfinished = 0;
    if (!this.props.formValues["tulpa"]) {
      return 1;
    }
    const tulpas = this.props.formValues["tulpa"];
    for (let i = 0; i < tulpas.length; ++i) {
      const tulpa = tulpas[i];

      let questions = [];
      for (const q of Q.Questions["tulpa_questions"].questions) {
        if (q.showif) {
          const split = q.showif.split(":", 2);
          const showIfKey = split[0];
          const showIfVal = split[1];

          const keyVal = tulpa[showIfKey];
          if (keyVal != showIfVal) {
            continue;
          }
        }

        if (!tulpa[q.key]) {
          unfinished++;
        };
      }
    }
    return unfinished;
  }

  render() {
    const unfinished = (
        this.countSkipped("intro") +
        this.countSkipped("tulpamancer") +
        this.countSkippedTulpas() +
        this.countSkipped("wonderland") +
        this.countSkipped("skills") +
        this.countSkipped("social"));

    return (
      <Card style={Style.card}>
        <CardTitle title="Review & Submit" />
        <CardText>
          {(unfinished>0) &&
            <p style={Style.unfinishedQuestions}>
              At least {unfinished} questions are left unanswered. Please review this section and
              see if you can add more details.
            </p>
          }
          {this.renderQuestionPage("intro")}
          {this.renderQuestionPage("tulpamancer")}
          {this.renderTulpas()}
          {this.renderQuestionPage("wonderland")}
          {this.renderQuestionPage("skills")}
          {this.renderQuestionPage("social")}
        </CardText>
      </Card>
    );
  }
}

export const ReviewPageWrap = connect(mapStateToReviewPageProps)(ReviewPage);

@reduxForm({form: "questionnaire", name: "questionnaire", destroyOnUnmount: false})
export class ReviewAction extends React.Component<any, {}> {
  render() {
    const { pristine, submitting, handleSubmit, reset } = this.props;

    return (
      <form onSubmit={handleSubmit} style={Style.buttonForm} >
        <RaisedButton type="submit" label="Submit" primary={true} disabled={pristine || submitting} />
      </form>
    );
  }
}
