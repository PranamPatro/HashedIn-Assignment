import React from 'react'

class Sorttable extends React.Component{
  constructor(props) {
    super(props);
    this.state = { tabdata: [] ,
    sortedby:"",
    searchdata:""}
  }
  componentDidMount() {
    fetch("https://gorest.co.in/public-api/users")
      .then(function(response) {
        return response.json();
      })
      .then(items => this.setState({ tabdata: items.data }));
  }
  datasort=(e, by)=>{
    this.setState({sortedby:by})
    const data = this.state.tabdata;
    data.sort((a,b) => a[by].localeCompare(b[by]))
    this.setState({tabdata:data})
  }

  searchdata =(e) =>{ 
    this.setState({
      searchdata:e.target.value
    })
  }
  searchresult = () =>{
    console.log(this.state.tabdata.filter(item => item.name == this.state.searchdata))
    this.setState({
      tabdata: this.state.tabdata.filter(item => item.name == this.state.searchdata)
    })
  }
  resetdata =() =>{
    this.setState({
      searchdata:""
    })
    fetch("https://gorest.co.in/public-api/users")
      .then(function(response) {
        return response.json();
      })
      .then(items => this.setState({ tabdata: items.data }));
  }
  render() {
    return (
      <React.Fragment>
      <div className="search" onChange={this.searchdata} value={this.state.searchdata}>
      <input type="text" className="inputbox"/>
      <button onClick={this.searchresult}>Search</button>
      <button onClick={this.resetdata}>Reset</button>
      </div>
      {
        this.state.sortedby.length>0?<h4>Your data is sorted for "{this.state.sortedby}" </h4>:<div>You haven't sorted the data yet</div>
      }
      <table>
        <thead>
          <tr>
            <th >Id</th>
            <th onClick={e => this.datasort(e, 'name')}>Name</th>
            <th onClick={e => this.datasort(e, 'gender')}>Gender</th>
            <th onClick={e => this.datasort(e, 'status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tabdata.map(function(item, index) {
            return (
              <tr key={item.id} >
                <td> {item.id}</td>
                <td >{item.name}</td>
                <td >{item.gender}</td>
                <td >{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      </React.Fragment>
    );
  }
}

export default Sorttable