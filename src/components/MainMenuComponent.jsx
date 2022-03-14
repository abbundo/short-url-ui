import React, { Component } from 'react'
import ShortUrlService from '../services/ShortUrlService'

class MainMenuComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shortUrl: []
    }
    this.addShortUrl = this.addShortUrl.bind(this);
    this.showAllShortUrls = this.showAllShortUrls.bind(this);
    this.addCustomUrl = this.addCustomUrl.bind(this);
    this.getOriginalUrl = this.getOriginalUrl.bind(this);
  }

  addCustomUrl() {
    this.props.history.push(`/add-shortUrl/_cust`);
  }

  getOriginalUrl() {
    this.props.history.push(`/view-shortUrl/_redir`);
  }

  addShortUrl() {
    this.props.history.push('/add-shortUrl/_add');
  }

  showAllShortUrls() {
    ShortUrlService.getAllShortUrls().then((res) => this.setState({shortUrl: res.data}));
  }

  render() {
    return (
      <div>
        <h2 className="text-center">ShortUrls Service</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addShortUrl}> Add ShortUrl</button>
          <p className="col-1"></p>
          <button onClick={this.addCustomUrl} className="btn btn-primary">Add Custom URL</button>
          <p className="col-1"></p>
          <button onClick={this.getOriginalUrl} className="btn btn-primary">Get original URL</button>
          <p className="col-1"></p>
          <button className="btn btn-primary" onClick={this.showAllShortUrls}> Show all ShortUrl</button>
        </div>
        <br></br>
        {(this.state.shortUrl.length > 0) &&
          (
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                <tr>
                  <th> Original URL</th>
                  <th> ShortUrl</th>
                  <th> Message</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.shortUrl.map(
                    shortUrl =>
                      <tr key={shortUrl.originalUrl}>
                        <td> {shortUrl.originalUrl} </td>
                        <td> {shortUrl.shortUrl}</td>
                        <td> {shortUrl.message}</td>
                      </tr>
                  )
                }
                </tbody>
              </table>

            </div>
          )
        }
      </div>
    )
  }
}

export default MainMenuComponent
