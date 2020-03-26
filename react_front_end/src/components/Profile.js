import React, { Component, Fragment } from 'react'

class Profile extends Component {
    state={
        name:'Lorem',
        email:'Lorem@gmail.com',
        phno:'1234567890',
        password:'1234567890',
        Confirm:'1234567890'

    }
    onChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        const {name,email,phno,password,Confirm}= this.state;
        return (
            
            <Fragment>
            <div className="container">
                <div className="row">
             <h1 className="center-align">Profile</h1>
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col s8 offset-s2">
                <label htmlFor="name">Name:</label>
                  <input value={name} id="name" type="text" className="validate" onChange={this.onChange}/>
                  </div>
                  <div className="col s8 offset-s2">
                    <label htmlFor="name">Email:</label>
                    <input value={email} id="email" type="email" className="validate" onChange={this.onChange}/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Phone Number:</label>
                    <input value={phno} id="phno" type="tel" className="validate" onChange={this.onChange}/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Password:</label>
                    <input value={password} id="password" type="password" className="validate" onChange={this.onChange}/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Confirm Password:</label>
                    <input value={Confirm} id="Confirm" type="password" className="validate" onChange={this.onChange}/>
                    </div>
                    <div className="col s8 offset-s2" style={{marginTop: '10px'}}>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Save Changes
                    <i className="material-icons right">check</i>
                    </button>
                    </div>
                    
                    </div>
                    </form>
                    </div>
                    </div>
                    </Fragment>
        )
    }
}

export default Profile
