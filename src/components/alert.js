import React from "react";

function alert(props) {
  return (
      props.msg && (<div style={{position:"fixed",zIndex:"2000",margin:"auto",left:"0",right:"0"}} class={`alert alert-${props.type=='danger'?'danger':'success'} alert-dismissible fade show`} role="alert">
        {props.msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>)
  );
}

export default alert;
