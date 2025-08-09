import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You could also log the error to a reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="container py-5">
                    <div className="alert alert-danger">
                        <h4 className="alert-heading">Something went wrong</h4>
                        <p>
                            {this.state.error?.message || "An unexpected error occurred."}
                        </p>
                        <hr />
                        <button className="btn btn-dark" onClick={this.handleReload}>
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
