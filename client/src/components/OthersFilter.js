import React, { Component} from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';

class OthersFilter extends Component{
    state={
        posts: [ ]
    }
   async componentDidMount(){
      
       const res=await axios.get('/api/issues/?category=Others')
                             //fires up only after the data is fetched
            console.log(res);
            this.setState({
                posts: res.data       
           
        })
        
    }
render(){
    const { posts}=this.state;
    const postList= posts.length?(posts.map(post=>{
        return(
            <div className="row">
            <div className="col s12">
              <div className="card #f4511e deep-orange darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{post.category}</span>
                  <p>{post.subject}</p>
                </div>
                <div className="card-action">
                   <Popup modal trigger={<a className="pointer">Read more...</a>}>
                   {close=>(
                        <div><a onClick={close}><i className=" modal-close material-icons right pointer" >clear </i></a> 
                        <h4 id="subject">{post.subject}</h4>
                          <p id="statement">{post.statement}</p>
                          <h6 className='left'>Posted by: {post.user.email}</h6>
                        <div className="modal-footer">
                          <a href="#!" className="modal-close btn-flat green right">Upvote<i className="material-icons right">arrow_upward</i></a>
                          <a href="#!" className="modal-close btn-flat red right">Downvote<i className="material-icons right">arrow_downward</i></a>
                        </div>
                        </div>
                        )}
                   </Popup>
                    
                </div>
              </div>
            </div>
            </div>
           
        )
    })):( 
        <div className="center">
        <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </div>
    )
    return(
        <div className="container">
        <br/>
        <br/>
        {postList}
        <div className="fixed-action-btn">
        <Link to='/add' className="btn-floating btn-large red waves-effect hoverable">
          <i className="large material-icons">add</i>
        </Link>
      </div>
            </div>
            
    )
}
}
export default OthersFilter;