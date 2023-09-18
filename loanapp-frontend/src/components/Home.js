import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
         <div id="body12" >
        <div className="px-4  text-center">
    
    <div className="col-lg-6 mx-auto">
      <h2 className=" mb-4"><b>This is home page</b></h2>
      <div>
      <h3 className="mb-4"><b>Already a user?</b></h3>
        <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3 mb-4" fdprocessedid="rac7s" onClick={() => navigate("/user/login")}>Login</button>
      </div>
      <div>
      <h3 className="mb-4"><b>Register to apply for loan..</b></h3>
        <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3 mb-4" fdprocessedid="rac7s" onClick={() => navigate("/user/register")}>Register</button> 
      </div>
      <div>
      <h3 className="mb-4"><b>Login as Admin</b></h3>
        <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3" fdprocessedid="rac7s" onClick={() => navigate("/admin/login")}>Login</button> 
      </div>
      
    </div>
   
  </div>
  </div>

        
        </>
    )
}


export default Home;