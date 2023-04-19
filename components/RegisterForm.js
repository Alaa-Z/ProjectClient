function RegisterForm() {
    return(
        <form>
            <label>
            Name:
            <input type="text" /> <br></br>
            </label>
            <label>
            Email:
            <input type="email" /> <br></br>
            </label>
            <label>
            Password:
            <input type="password"/><br></br>
            </label>
            <button type="submit"> Register </button>
        </form>
    )
}
 
  export default RegisterForm;
