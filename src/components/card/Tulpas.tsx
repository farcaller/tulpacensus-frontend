import * as React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { reduxForm, FieldArray, Field } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentRemove from "material-ui/svg-icons/content/remove";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";

import * as Style from "../../style";


@reduxForm({form: "questionnaire", name: "questionnaire", destroyOnUnmount: false})
export class TulpasPage extends React.Component<{}, {}> {
  render() {
    return (
      <Card style={Style.card}>
        <CardTitle title="Tulpas" />
        <CardText>
          <p>
            You are proceeding to the tulpa part. This year we don"t collect aggregated data,
            meaning you will have to fill one page of questions per tulpa. Please understand that it
            is done to improve the quality of responses.
          </p>
          <p>
            You will be given the chance to "name" your tulpas here. This is done purely for your
            convenience in case you need to distinguish them in the survey. <b>Tulpa names are not
            transferred and stored on the server</b> and are completely optional to use.
          </p>
          <FieldArray name="tulpa" component={TulpaArray}/>
        </CardText>
      </Card>
    );
  }
}

interface TulpaArrayProps {
  fields: any;
}

interface TulpaArrayState {
  dialogOpen: boolean;
  snackOpen: boolean;
  snackMessage: string;
  tulpaToRemoveIndex: number;
}

class TulpaArray extends React.Component<TulpaArrayProps, TulpaArrayState> {
  state = {
    dialogOpen: false,
    snackOpen: false,
    snackMessage: "",
    tulpaToRemoveIndex: -1,
  };

  handleOpen = (index?: number) => {
    this.setState(Object.assign({}, this.state, {
      dialogOpen: true,
      tulpaToRemoveIndex: index,
    }));
  };

  handleClose = () => {
    this.setState(Object.assign({}, this.state, {dialogOpen: false}));
  };

  handleRemove = () => {
    this.props.fields.remove(this.state.tulpaToRemoveIndex);
    this.setState(Object.assign({}, this.state, {
      dialogOpen: false,
      tulpaToRemoveIndex: -1,
    }));
  };

  handleAdd = () => {
    this.props.fields.push({});
    if (this.props.fields.length === 3) {
      this.memegen("Nice team you have :>");
    }
    if (this.props.fields.length === 10) {
      this.memegen("Wow! Much tulpa!");
    }
    if (this.props.fields.length === 20) {
      this.memegen("Head explode in 3... 2...");
    }
  }

  memegen(meme: string) {
    this.setState(Object.assign({}, this.state, {
      snackOpen: true,
      snackMessage: meme,
    }));
  }

  handleRequestClose = () => {
    this.setState(Object.assign({}, this.state, {
      snackOpen: false,
    }));
  };

  render() {
    const fields = this.props.fields;

    return (
      <div>
        <RaisedButton type="button" label="Add Tulpa" secondary={true} onClick={this.handleAdd} />
        <div>
          {fields.map((tulpa, index) =>
            <div key={index}>
              <Field name={`${tulpa}.name_dont_save`} component={TextField} floatingLabelText={`Tulpa ${index + 1} nickname`} />
              <FloatingActionButton mini={true} secondary={true} onClick={() => {this.handleOpen(index);}} style={Style.removeButton}>
                <ContentRemove />
              </FloatingActionButton>
            </div>
          )}
        </div>
        <Dialog
          title="Confirm removal"
          actions={[
            <FlatButton
              label="Cancel"
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Remove"
              primary={true}
              onTouchTap={this.handleRemove}
            />,
          ]}
          modal={true}
          open={this.state.dialogOpen}
        >
          You are about to remove tulpa {this.state.tulpaToRemoveIndex + 1} responses completely. Continue?
        </Dialog>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
