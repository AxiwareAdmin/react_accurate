import React from 'react'

export default function Loader(props) {
  return (
    props.display && (
    <>
    {/* <div style={{width:'100%',height:'100%',position:'absolute',backgroundColor:'red',zIndex:'1'}}>

    </div> */}
    <div class="spinner-border text-primary" style={{position:'fixed',top:'50%',left:'50%',width:'150px',height:'150px',zIndex:'2'}} role="status">
    <span class="sr-only">Loading...</span>
  </div>
  </>
  
  )

  
  )
}
