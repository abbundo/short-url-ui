import React, { Component } from 'react'
import ShortUrlService from '../services/ShortUrlService';

class CreateShortUrlComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      operation: this.props.match.params.id,
      originalUrl: '',
      shortUrl: '',
      message: '',
      done: false,
      error: undefined
    }
  }

  saveOrUpdateShortUrl = (e) => {
    e.preventDefault();
    if (this.state.operation === '_add') {
      ShortUrlService.createShortUrl(this.state.originalUrl).then(res => this.setState({...res.data, done:true}))
        .catch((e) => {
          const status = e.response.status + " ";
          this.setState({...this.state, error: JSON.parse(e.response.data.substring(4))});
        });
    } else {
      ShortUrlService.createCustomShortUrl(this.state).then(res => this.setState({...res.data, done:true}))
        .catch((e) => {
          const status = e.response.status + " ";
          this.setState({...this.state, error: JSON.parse(e.response.data.substring(4))});
        });
    }
  }

  cancel() {
    this.props.history.push('/shortUrl');
  }

  /**
   * Since the component is used for create and update, we just render a different Title on the page
   */
  getTitle() {
    if (this.state.operation === '_add') {
      return <h3 className="text-center">Add ShortUrl</h3>
    } else {
      return <h3 className="text-center">Add custom ShortUrl</h3>
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          {!this.state.done &&
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                {this.getTitle()}
                <div className="card-body">
                  <form onSubmit={this.saveOrUpdateShortUrl}>
                    <div className="form-group">
                      <label>URL to shorten</label>
                      <input type="text" placeholder={"URL to shorten."} className="form-control"
                             required={true}
                             onChange={this.handleOnOriginalUrlChange()}/>
                      {this.state.operation === '_cust' &&
                        <div>
                          <br></br>
                          <label>Short URL to associate</label>
                          <input type="text" placeholder={"Short URL to associate."} className="form-control"
                                 required={true}
                                 onChange={this.handleOnShortUrlChange()}/>
                        </div>
                      }
                    </div>

                    <button type="submit" className="btn btn-success">Save</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                            style={{marginLeft: "10px"}}>Back to main
                    </button>
                  </form>
                  {this.state.error &&
                    <div
                      style={{color: "red"}}>Error:{this.state.error["errorCode"]}{this.state.error["errorDescription"]} </div>
                  }
                </div>
              </div>
            </div>
          }
          <br></br>
          {this.state.done &&
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                Last added short URL
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

  handleOnOriginalUrlChange() {
    return (e) => this.setState({...this.state, error: undefined, originalUrl: e.target.value});
  }

  handleOnShortUrlChange() {
    return (e) => this.setState({...this.state, error: undefined, shortUrl: e.target.value});
  }
}

export default CreateShortUrlComponent
