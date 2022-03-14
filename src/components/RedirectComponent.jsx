import React, { Component } from 'react'
import ShortUrlService from "../services/ShortUrlService";

class RedirectComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      originalUrl: '',
      shortUrl: '',
      message: '',
      done: false,
      error: undefined
    }
  }

  getOriginalUrl = (e) => {
    e.preventDefault();
    ShortUrlService.getOriginalUrl(this.state.shortUrl).then(res => {
      this.setState({...res.data, done: true});
      window.open(this.state.originalUrl, "_blank");
    })
      .catch((e) => {
        const status = e.response.status + " ";
        this.setState({...this.state, error: e.response.data});
      });
  }

  cancel() {
    this.props.history.push('/shortUrl');
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">Redirect to original URL</h3>
          {!this.state.done &&
            <div className="row">
              <div className="card-body">
                <form onSubmit={this.getOriginalUrl}>
                  <div className="form-group">
                    <label>Short URL</label>
                    <input type="text" placeholder={"Short URL."} className="form-control"
                           required={true}
                           onChange={this.handleOnShortUrlChange()}/>
                  </div>

                  <button type="submit" className="btn btn-success">Search</button>
                  <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                          style={{marginLeft: "10px"}}>Back to main
                  </button>
                </form>
                <br></br>
                {this.state.error &&
                  <div
                    style={{color: "red"}}>Error:{this.state.error["error"]}, {this.state.error["message"]} </div>
                }
              </div>
            </div>
          }
          <br></br>
          {this.state.done &&
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                Short URL info loaded
                <div className="card-body">
                  <p className="row">Original Url: {this.state.originalUrl}</p>
                  <p className="row">Short Url: {this.state.shortUrl}</p>
                  <p className="row">Message: {this.state.message}</p>
                  <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                          style={{marginLeft: "10px"}}>Back to main
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  handleOnShortUrlChange() {
    return (e) => this.setState({...this.state, error: undefined, shortUrl: e.target.value});
  }
}

export default RedirectComponent
