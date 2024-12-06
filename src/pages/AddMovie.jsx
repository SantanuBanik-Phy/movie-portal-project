import { Helmet } from "react-helmet";
import AddMovieForm from "../components/AddMovieForm";




const AddMovie = () => {
    return (
        <> 
         <AddMovieForm />
         <Helmet>
            <title>Add Movie | Movie Portal</title>
         </Helmet>
        </>
       
        
    );
};

export default AddMovie;