
export default function Register()
{
    const navigate = navigate();
    const [data,setData] = useAtom(client);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    return(
        <>
            <div className="container ">
            <form>
                <div className="mb-3">
                    <label className="form-label">Insert e-mail</label>
                    <input name="mail" type="text" className="form-control" id="date" aria-describedby="emailHelp"  onChange={synchronize} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Insert Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp"  onChange={synchronize} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input name="passwordConfirm" type="password" className="form-control" id="exampleInputPassword2" aria-describedby="emailHelp"  onChange={synchronize} />
                </div>

                {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}

                <input className="btn btn-primary" type="button" onClick={} value="Register" />
            </form>
        </div>

        </>
    );
}