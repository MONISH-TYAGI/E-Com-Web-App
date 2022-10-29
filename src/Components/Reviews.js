import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../Config/Config';

function Reviews({email}) {
    const [data,setData]=useState([]);
    const [boolVal,change]=useState(false);
    useEffect(()=>{
        async function fetchData() {
        const citiesRef = db.collection('Reviews');
        const snapshot = await citiesRef.get();
        let localdata=[]
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          localdata=[...localdata,doc.data()];
        });
         setData(localdata);
        console.log("D->"+data.length);
    }
    fetchData()
    },[boolVal])
    const [view,setView]=useState(false);
    const [comment,setComment]=useState("");
    const [star,setStar]=useState(0);
    
    const runFun=async()=>{
        const date = new Date();
        const time = date.getTime();
        const update= new Date().toLocaleString();
                db.collection('Reviews').doc(time+"").set({
 User:email,
 Comment:comment,
 Star:star,
 Time:update
    }).then(() =>{
console.log("Done Review");    
change(!boolVal);        
           }).catch((err)=>{
            console.log("Error"+err);
           })
        console.log("comment",comment);   
         console.log("star",star);   
         setComment("");
         setStar(0);
         
    }
    const handleComment=(e)=>{
        setComment(e.target.value);
     
    }
    const handleStar=(e)=>{
        setStar(e.target.value);
        // console.log("star",star);
    }
    const showData=()=>{
     if(data.length>0)
        {
            data.map((obj)=>{
                console.log(obj.Comment+" and "+obj.Star);
            })
        }
    }
  return (
    <div>
      <h1>Reviews</h1>
      <div>
      <input type="text" id="comment" name="comment" style={{margin:"1em"}} onChange={handleComment} value={comment}></input>
      <input type="number" id="star" name="star" style={{margin:"1em"}} onChange={handleStar} value={star}></input>
      <button onClick={runFun}>ADD</button>
      <button onClick={showData}>Show</button>
      {
       
       data.map((obj)=>{
        let Src="";
            if(obj.Star==1)
            Src="https://www.pngitem.com/pimgs/m/11-115391_1-5-stars-png-transparent-png.png" ;
            else if(obj.Star==2)
            Src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/2_stars.svg/1280px-2_stars.svg.png" ;
            else if(obj.Star==3)
            Src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/3_stars.svg/1280px-3_stars.svg.png";
            else if(obj.Star==4)
            Src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/4_stars.svg/1200px-4_stars.svg.png";
            else if(obj.Star==5)
            Src="https://i.postimg.cc/bYVvHpJM/58738756f3a71010b5e8ef44-10.png" ;
        
return(
    <div class="card mb-3" style={{maxwidth:"540px"}}>
    <div class="row g-0">
      <div class="col-md-4">
        {/* {
        (obj.Star==1)(<img src="https://www.pngitem.com/pimgs/m/11-115391_1-5-stars-png-transparent-png.png" class="img-fluid rounded-start" alt='..'/>)
        (obj.Star==2)(<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/2_stars.svg/1280px-2_stars.svg.png" class="img-fluid rounded-start" alt='..'/>)
        (obj.Star==3) (<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/3_stars.svg/1280px-3_stars.svg.png" class="img-fluid rounded-start" alt='..'/>)
        (obj.Star==4) (<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/4_stars.svg/1200px-4_stars.svg.png" class="img-fluid rounded-start" alt='..'/>)
        (obj.Star==5) (<img src="https://assets.stickpng.com/images/58738756f3a71010b5e8ef44.png" class="img-fluid rounded-start" alt='..'/>)
        
        } */}
        <img src={Src}  class="img-fluid rounded-start" alt='..'/>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{obj.Email}</h5>
          <p class="card-text">{obj.Comment}</p>
          <p class="card-text"><small class="text-muted">Last updated on {obj.Time}</small></p>
        </div>
      </div>
    </div>
  </div>

)
       })
      }
      </div>
    </div>
  )
}

export default Reviews
