import * as React from 'react';
import './App.css';
import { Wrapper } from 'src/Components/Wrapper';
import { Header } from 'src/Components/Header';
import { Sidebar } from 'src/Components/Sidebar';
import { GoogleMap } from 'src/Components/GoogleMap';

const mock: KoskiLocation[] = require("./mock");


interface Props { }
interface State {
  data: KoskiLocation[];
  activeLocation?: KoskiLocation;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      activeLocation: undefined,
      data: []
    }
  }

  public componentDidMount() {
    // Fetch
    setTimeout(() => {
      this.setState({
        data: mock.filter(location => location.gdata.status === "OK")
      })
    }, 1000)
  }

  public setActiveLocation = (location: KoskiLocation) => {
    this.setState({
      activeLocation: location
    })
  }
  public render() {
    return (
      <Wrapper>
        <Header title="Kalastusluvat" />
        <Sidebar locationList={this.state.data} setActiveLocation={this.setActiveLocation} />
        <GoogleMap locationList={this.state.data} activeLocation={this.state.activeLocation} />
      </Wrapper>
    );
  }
}

export default App;
