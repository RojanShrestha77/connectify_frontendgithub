import SideNav from "../Components/SideNav";
import Post from "../Components/Post";
function Feed(){
    return(
        <div>
            <div className="sidenav_page">
            <SideNav/>
            </div>
            <div className="feed_page">
                <Post/>
            </div>
            
            

        </div>
        
    );
}

export default Feed;