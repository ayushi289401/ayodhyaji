import React from 'react';
import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';
import MicRecorder from 'mic-recorder-to-mp3';
import { Container, Row, Col } from 'reactstrap';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AyodhyaJi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      countstart:15682,
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    return (
      <div className="App">

      <header className="Mandir-header">
      <head>
        <title>अयोध्या जी में आपका स्वागत है | Welcome to Ayodhya Ji</title>
      </head>

        <p>
         <h1> अयोध्या जी में आपका स्वागत है | Welcome to Ayodhya Ji</h1>
        </p>


      {/* <span className="myClass" style={{float : 'left', paddingRight : '5px'}} > </span> */}

        <Container>
          <Row>
            <Col><img src={require('./ram-mandir.jpg')}/></Col>
            <Col>        <p>
          <h1>
            {/* <b>Let's make World Record of writing and chanting Jai Shri RAM</b>
            <br/> */}
            <b>आइए जय श्री राम लिखने और जप करने का विश्व रिकॉर्ड बनाएं</b>
            <br/>
            <p>
              Current Counter {this.state.countstart}
            </p>
          </h1>
        </p></Col>
            {/* <Col>
              <iframe src='https://www.youtube.com/watch?v=lqNpCH-xcG'
              frameborder='0'
              allow='autoplay; encrypted-media'
              title='video'
              />
        </Col> */}
          </Row>
        </Container>

        <div>
          <button onClick={this.start} disabled={this.state.isRecording}>Press kare aur bhagwan RAM ka naam le | प्रेस करे और भगवान राम का नाम ले</button>

          <button onClick={this.stop} disabled={!this.state.isRecording}>Astuti Ke baad yaha pe click kare | अपनी प्रार्थना के बाद यहां दबाएं</button>
          </div>
          <div>
            <b>अपनी प्रार्थना सुनो</b>
            
            <audio src={this.state.blobURL} controls="controls"/>
          </div>

      </header>
    </div>
    );
  }
}

export default AyodhyaJi;