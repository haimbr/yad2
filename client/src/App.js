import React, { useState } from 'react';
import Header from './components/main/headers/Header';
import Footer from './components/main/Footer';
import LoginPage from './components/login/Login-page';
import SearchPage from './components/search/SearchPage.component';
import MobileMenu from './components/main/MobileMenu';




const App = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayMobileNav, setDisplayMobileNav] = useState(false);

    return (
        <div >
            
            <Header setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />
            {/* <SearchPage /> */}
            {displayMobileNav && <MobileMenu setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav}  />}
            <LoginPage displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
            <Footer />
        </div>
    )
}


// class StopWatch extends React.Component {
//     state = {lapse: 0, running: false}

//     handleRunClick = () => {
//       this.setState(state => {
//         if (state.running) {
//           clearInterval(this.timer)
//         } else {
//           const startTime = Date.now() - this.state.lapse
//           this.timer = setInterval(() => {
//             // console.log(Date.now())
//             this.setState({
//               lapse: Date.now() - startTime,
//             })
//           })
//         }
//         return {running: !state.running}
//       })
//     }

//     handleClearClick = () => {
//       clearInterval(this.timer)
//       this.setState({lapse: 0, running: false})
//     }

//     render() {
//       const {lapse, running} = this.state

//       const buttonStyles = {
//         border: '1px solid #ccc',
//         background: '#fff',
//         fontSize: '2em',
//         padding: 15,
//         margin: 5,
//         width: 200,
//       }

//       return (
//         <div style={{textAlign: 'center'}}>
//           <label
//             style={{
//               fontSize: '5em',
//               display: 'block',
//             }}
//           >
//             {lapse}ms
//           </label>
//           <button onClick={this.handleRunClick} style={buttonStyles}>
//             {running ? 'Stop' : 'Start'}
//           </button>
//           <button onClick={this.handleClearClick} style={buttonStyles}>
//             Clear
//           </button>
//         </div>
//       )
//     }
//   }

//   class App extends React.Component {
//     state = {showStopWatch: true}
//     render() {
//       const {showStopWatch} = this.state
//       return (
//         <div>
//           <label>
//             Show Stop Watch{' '}
//             <input
//               type="checkbox"
//               checked={showStopWatch}
//               onChange={e => this.setState({showStopWatch: e.target.checked})}
//             />
//           </label>
//           <hr />
//           {showStopWatch ? <StopWatch /> : null}
//         </div>
//       )
//     }
//   }


export default App;
