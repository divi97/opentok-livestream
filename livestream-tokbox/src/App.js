import React from "react";
import "./App.css";
import { OTSession, OTStreams, preloadScript } from "opentok-react";
import ConnectionStatus from "./components/ConnectionStatus";
import Publisher from "./components/Publisher";
import Subscriber from "./components/Subscriber";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      connected: false,
    };
    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      },
    };
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  render() {
    return (
      <>
        <OTSession
          apiKey={this.props.PublisherConfig.apiKey}
          sessionId={this.props.PublisherConfig.sessionId}
          token={this.props.PublisherConfig.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
        >
          {this.state.error ? <div id="error">{this.state.error}</div> : null}

          <ConnectionStatus connected={this.state.connected} />

          <Publisher />
        </OTSession>

        <OTSession
          apiKey={this.props.SubscriberConfig.apiKey}
          sessionId={this.props.SubscriberConfig.sessionId}
          token={this.props.SubscriberConfig.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
        >
          <OTStreams>
            <Subscriber />
          </OTStreams>
        </OTSession>
      </>
    );
  }
}

export default preloadScript(App);
