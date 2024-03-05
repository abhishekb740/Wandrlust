import { Button, Input } from "@nextui-org/react";
import axios from "axios";

const AuthPage = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        axios
            .post("http://localhost:5000/authenticate", { username: value })
            .then((r) => props.onAuth({ ...r.data, secret: value }))
            .catch((e) => console.log("Auth Error", e));
    };

    return (
        <div className="h-[80vh] flex justify-center items-center">
            <form onSubmit={onSubmit} className="">
                <div className="text-6xl">Welcome 👋</div>

                <div className="form-subtitle">Set a username to get started</div>

                <div className="flex-col gap-10">
                    <Input className="auth-input" name="username" />
                    &nbsp;
                    <Button type="submit" color="danger" className="flex justify-center">
                        Enter
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;    