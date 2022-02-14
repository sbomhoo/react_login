import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} ></input>
                <input type="password" value={this.state.value} onChange={this.handleChange} ></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default LoginForm;