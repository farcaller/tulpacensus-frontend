import * as React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";

import * as Style from "../../style";


export class WelcomePage extends React.Component<{}, {}> {
  render() {
    return (
      <Card style={Style.card}>
        <CardTitle title="Welcome" />
        <CardText>
          <p>
            Welcome to the yearly tulpa questionnaire. We tried to address all your wishes over the years
            and this questionnaine is the most advanced technology we came up with in 2016.
          </p><p>
            The main difference from year 2015 is that we do not longer collect averages for your tulpas.
            In this questionnaire you will have a dedicated set of questions for each one of your tulpas.
            Surely, that requires more time to fill everything in, but rest assured that this level of detail
            will allow us to provide you with more interesting, detailed and absolutely scientific research
            of the community.
          </p><p>
            I'd like to personally thank Meten, Alsa, Shinyuu, and everyone at r/TulpaCensusFeedback
            for thier continuous input, feedback, bug reporting and professionalism.
          </p><p>
            Have fun!
          </p><p>
            <i>The tulpa census crew</i>
          </p>
        </CardText>
      </Card>
    );
  }
}
