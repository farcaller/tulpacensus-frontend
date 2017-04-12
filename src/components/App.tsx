import * as React from "react";
import { Router, Route, hashHistory, IndexRoute, Link, RouteComponentProps } from "react-router";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { sha256 } from "js-sha256";

import * as Style from "../style";
import { WelcomePage } from "./card/Welcome";
import { TulpasPage } from "./card/Tulpas";
import { QuestionsPage } from "./card/Questions";
import { ReviewPageWrap, ReviewAction } from "./card/Review";


export class App extends React.Component<{}, {}> {
  render() {
    // TODO(farcaller): use react-router-scroll
    return (
      <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)} >
        <Route path="/" component={AppInnerWrap}>
          <IndexRoute component={WelcomePage}/>
          <Route path="tulpas" component={TulpasPage} />
          <Route path="review" component={ReviewPageWrap} />
          <Route path=":page" component={QuestionsPage} />
          <Route path="tulpa/:tulpa" component={QuestionsPage} />
        </Route>
      </Router>
    );
  }
}

interface AppInnerState {
  open: boolean;
  isSubmitting?: boolean;
  submittingStatusInfo?: string;
  submittingDone?: boolean;
}

interface RouteParams {
  page: string;
  tulpa: string;
}

interface AppInnerProps extends RouteComponentProps<RouteParams, {}> {
  hasTulpas?: boolean;
  tulpaNames?: string[];
  onStoreSubmitSuccessful?: (successful: boolean) => void;
  wasSubmitted?: boolean;
  ageFuckupDetected?: boolean;
  form?: any;
}

function mapStateToAppInnerProps(state: any): AppInnerProps {
  let hasTulpas = false;
  let tulpaNames = [];
  let wasSubmitted = false;
  let ageFuckupDetected = true;
  let form = {};
  try {
    form = state.form.questionnaire.values;
    hasTulpas = state.form.questionnaire.values.tulpa.length > 0;
    tulpaNames = state.form.questionnaire.values.tulpa.map(t => t["name_dont_save"]);
    wasSubmitted = state.a.s;

    for (const tup of state.form.questionnaire.values.tulpa) {
      if (tup['tulpa_age'] !== undefined) {
        ageFuckupDetected = false;
        break;
      }
    }
  } catch (e) {}

  return {
    hasTulpas,
    tulpaNames,
    wasSubmitted,
    ageFuckupDetected,
    form,
  };
}

function storeSubmitSuccessful(successful: boolean) {
  return {
    type: 'SUBMIT_SUCCESSFUL',
    successful: successful,
  }
}

function mapDispatchToAppInnerProps(dispatch: any): AppInnerProps {
  return {
    onStoreSubmitSuccessful: (successful: boolean) => {
      dispatch(storeSubmitSuccessful(successful));
    }
  }
}

class AppInner extends React.Component<AppInnerProps, AppInnerState> {
  constructor(props: AppInnerProps) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
      isSubmitting: this.state.isSubmitting,
      submittingDone: this.state.submittingDone,
      submittingStatusInfo: this.state.submittingStatusInfo,
    });
  }

  title = () => {
    if (this.props.location.pathname === "/") {
      return "Tulpa Census 2016";
    } else if (this.props.params.tulpa) {
      const name = this.props.tulpaNames[(+this.props.params.tulpa) - 1];
      if (name) {
        return name;
      } else {
        return `Tulpa ${+this.props.params.tulpa}`;
      }
    } else {
      return this.routesHash()[this.props.location.pathname];
    }
  }

  routesHash() {
    return {
      "/": "Welcome",
      "/intro": "Introduction",
      "/tulpamancer": "Tulpamancer",
      "/tulpas": "Tulpas",
    // /tulpa/:page meta shit happens here
      "/wonderland": "Wonderland",
      "/skills": "Skills",
      "/social": "Social",
      "/review": "Review & Submit",
    };
  }

  routesTop() {
    return {
      "/": "Welcome",
      "/intro": "Introduction",
      "/tulpamancer": "Tulpamancer",
      "/tulpas": "Tulpas",
    };
  }

  routesBottom() {
    return {
      "/wonderland": "Wonderland",
      "/skills": "Skills",
      "/social": "Social",
      "/review": "Review & Submit",
    };
  }

  submitCensus = (data) => {
    // wipe the names
    for (let i = 0; i < data.tulpa.length; ++i) {
      data.tulpa[i]['name_dont_save'] = '';
    }

    data['meta'] = {
      tulpa_age_fix: true,
    }

    this.setState({
      open: false,
      isSubmitting: true,
      submittingDone: this.state.submittingDone,
      submittingStatusInfo: this.state.submittingStatusInfo,
    });
    window.scrollTo(0, 0);

    console.log(JSON.stringify(data));
    return (window as any).fetch("/post", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
      credentials: "include",
    });
  }

  submitCensusFail = (errors, dispacth) => {
    console.log("ERR", errors);
    this.setState({
      open: false,
      isSubmitting: true,
      submittingDone: true,
      submittingStatusInfo: "Something went wrong. Try again, then contact us on /r/tulpas",
    });
  }

  submitCensusSuccess = (result, dispacth) => {
    if (result.ok) {
      this.props.onStoreSubmitSuccessful(true);

      this.setState({
        open: false,
        isSubmitting: true,
        submittingDone: false,
        submittingStatusInfo: "Thanks! Your results have been recorded!",
      });
    } else {
      console.log("ERR", result);
      this.setState({
        open: false,
        isSubmitting: true,
        submittingDone: true,
        submittingStatusInfo: "Something went wrong. Try again, then contact us on /r/tulpas",
      });
    }
  }

  finishSubmitting = () => {
    this.setState({
      open: false,
      isSubmitting: false,
      submittingDone: undefined,
      submittingStatusInfo: undefined,
    });
  }

  fixTulpaAge = () => {
    this.verifySubmission();
    this.props.onStoreSubmitSuccessful(false);
  }

  verifySubmission = () => {
    const data = JSON.stringify(this.props.form);
    const dataSha = sha256(data);

    (window as any).fetch("/postsha", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: dataSha,
        credentials: "include",
    }).then((ok, fail) => {
      console.log("ret", ok, fail);
    })
  }

  render() {
    const isTulpaPage = this.props.location.pathname.indexOf("/tulpa/") === 0;
    const staticPages = Object.keys(this.routesHash());
    let hasNext: boolean;
    let hasPrevious: boolean;
    let hasSubmit = false;
    let linkNext: string;
    let linkPrevious: string;
    let continueDisabled: boolean;
    let continueLabel: string;

    if (isTulpaPage) {
      hasNext = true;
      hasPrevious = true;
      const page = +this.props.params.tulpa;
      if (page === 1) {
        linkPrevious = "/tulpas";
      } else {
        linkPrevious = `/tulpa/${page - 1}`;
      }
      if (page === this.props.tulpaNames.length) {
        linkNext = "/wonderland";
      } else {
        linkNext = `/tulpa/${page + 1}`;
      }
    } else {
      const currentPage = staticPages.indexOf(this.props.location.pathname);
      if (currentPage === -1) {
        // not found
        hasNext = false;
        hasPrevious = false;
      } else {
        // static page
        hasNext = (this.props.location.pathname !== "/review");
        hasPrevious = (this.props.location.pathname !== "/");

        if (hasNext) {
          if (this.props.location.pathname === "/tulpas") {
            linkNext = "/tulpa/1";
          } else {
            linkNext = staticPages[currentPage + 1];
          }
        }

        if (hasPrevious) {
          if (this.props.location.pathname === "/wonderland") {
            // will break as fuck if use skips past tulpa screen.
            linkPrevious = `/tulpa/${this.props.tulpaNames.length}`;
          } else {
            linkPrevious = staticPages[currentPage - 1];
          }
        }

        if (!hasNext) {
          hasSubmit = true;
        }
      }
    }

    if (this.props.location.pathname === "/tulpas" && this.props.hasTulpas === false) {
      continueDisabled = true;
      continueLabel = "Add more tulpas";
    } else {
      continueDisabled = false;
      continueLabel = "Continue";
    }

    if (this.props.wasSubmitted) {
      return <div>
        <Card style={Style.card}>
          <CardTitle>Thanks!</CardTitle>
          <CardText>
            <p>
              Your response was sumbitted, thanks for your time.
              Watch the <a href="https://www.reddit.com/r/Tulpas/">/r/tulpas</a> sub
              for further announcements on the results.
            </p>
            {this.props.ageFuckupDetected &&
            <p>
              <b>Sorry, we screwed up, and forgot to ask the tulpa age.</b>
              Unfortunately, this mistake slipped past our careful review team and we failed
              to identify it in time. Your response was submitted already, but it would help
              us a lot if you took an extra minute and filled in the new field. Just press the
              button below, navigate to your tulpa(s) detail page and add the age, then re-submit.
              Please, do not change any other details.
            </p>}
          </CardText>
          <CardActions>
            {this.props.ageFuckupDetected ?
               <RaisedButton type="button" primary={true} label="Fix tulpa age" onTouchTap={this.fixTulpaAge} />
             :
               <RaisedButton type="button" primary={true} label="Yays! I'm awesome" />
            }
          </CardActions>
        </Card>
      </div>;
    }

    if (this.state.isSubmitting) {
      return <div>
        <Card style={Style.card}>
          <CardTitle>Submitting, do not refresh</CardTitle>
          <CardText>{this.state.submittingStatusInfo}</CardText>
          <CardActions>
            {this.state.submittingDone &&
                <RaisedButton primary={true} type="button" label="Close" onTouchTap={this.finishSubmitting} />}
          </CardActions>
        </Card>
      </div>;
    }

    return (
      <div>
        <AppBar
            title={this.title()}
            onLeftIconButtonTouchTap={this.handleToggle}
            style={Style.appBar}
        />

        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({
            open: open,
            isSubmitting: this.state.isSubmitting,
            submittingDone: this.state.submittingDone,
            submittingStatusInfo: this.state.submittingStatusInfo})}
        >
          {Object.keys(this.routesTop()).map((k) => {
            let r = this.routesTop()[k];
            return <MenuItem key={k} containerElement={<Link to={k} />} onTouchTap={this.handleToggle}>{r}</MenuItem>;
          })}
          {this.props.tulpaNames.map((n, i) => {
            return <MenuItem key={i} containerElement={<Link to={`/tulpa/${i + 1}`} />} onTouchTap={this.handleToggle} innerDivStyle={Style.tulpaMenuItem}>
              {n && n || `Tulpa ${i + 1}`}
            </MenuItem>;
          })}
          {this.props.hasTulpas &&
            Object.keys(this.routesBottom()).map((k) => {
              let r = this.routesBottom()[k];
              return <MenuItem key={k} containerElement={<Link to={k} />} onTouchTap={this.handleToggle}>{r}</MenuItem>;
            })
          }
        </Drawer>

        <div style={Style.body}>
          {this.props.children}

          <Card style={Style.card}>
            <CardActions>
              {hasPrevious &&
                  <RaisedButton type="button" label="Back"
                      containerElement={<Link to={linkPrevious} />} />}
              {hasNext &&
                  <RaisedButton type="button" label={continueLabel} secondary={true} disabled={continueDisabled}
                      containerElement={continueDisabled ? <div/> : <Link to={linkNext} />} />}
              {hasSubmit &&
                  <ReviewAction
                      onSubmit={this.submitCensus}
                      onSubmitFail={this.submitCensusFail}
                      onSubmitSuccess={this.submitCensusSuccess}
                  />}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

const AppInnerWrap = connect(mapStateToAppInnerProps, mapDispatchToAppInnerProps)(AppInner);
