import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../lib/firebase';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
// import { useAuth } from '@contexts/auth';
// import styles from '@styles/signin.module.scss'; 


const SignUpPage = () => {
    const router = useRouter();  
    // const [user, userLoading] = useAuth();  
    const [values, setValues] = useState({ email: '', password: '', fullName: '' });   
    // if (userLoading) {    
    //     return <h1>Loading...</h1>;  
    // }   
    // if (user && typeof window !== 'undefined') {
    //     router.push('/');    
    //     return null;  
    // }   
    const handleChange = (e) => {    
        const id = e.target.id;    
        const newValue = e.target.value;     
        setValues({ ...values, [id]: newValue });  
    };   
    const handleSubmit = (e) => {    
        e.preventDefault();     
        let missingValues = [];    
        Object.entries(values).forEach(([key, value]) => {      
            if (!value) {        
                missingValues.push(key);      
            }    
        });     
        if (missingValues.length > 1) {      
            alert(`You're missing these fields: ${missingValues.join(', ')}`);      
            return;    
        }     
        signUp(values.email, values.password, values.fullName).catch((err) => {      
            alert(err);    
        });  
    };   
    return (    
    <div className={"temp"}>      
    <form onSubmit={handleSubmit}>        
    <h1>Please Sign Up</h1>
    <label htmlFor="fullName">Full Name</label>        
    <input          
    id="fullName"          
    type="text"          
    value={values.fullName}          
    onChange={handleChange}        />   

    <label htmlFor="email">Email</label>        
    <input          
    id="email"          
    type="email"          
    value={values.email}          
    onChange={handleChange}        />        
    <label htmlFor="password">Password</label>        
    <input          
    id="password"          
    type="password"          
    value={values.password}          
    onChange={handleChange}        />        
    <button type="submit">Sign In</button>      
    </form>    
    </div>  
    );
}; 


// export default SignInPage;

const MyLoader = () => <div>Loading...</div>

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
  })(SignUpPage)