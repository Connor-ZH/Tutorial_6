const style = {
  ul: {
    display: "block",
    zIndex: 100,
    overflow: "auto",
    left: 0,
    margin: 0,
    padding: 0,
    backgroundColor: "#F0E5CF",
    width: "100%",
    minWidth:"1366px",
  },

  li:{
    display: "block",
    position:"sticky",
    float: "left",
  },

  a:{
    display: "block",
    position:"sticky",
    display: "block",
    color: "white",
    padding: "10px 40px",
    textDecoration: "none",
    textAlign: "left",
    fontSize: "35px",
    fontFamily: "Brush Script MT",
    backgroundColor: "#4B6587",
  },

  b:{
    display:" block",
    position: "-webkit-sticky",
    display: "block",
    color: "#000",
    padding: "8px 16px",
    textDecoration:" none",
    textAlign: "center",
    cursor:"pointer",
  }, 

  bActive:{
    display:" block",
    position: "-webkit-sticky",
    display: "block",
    color: "white",
    padding: "8px 16px",
    textDecoration:" none",
    textAlign: "center",
    cursor:"pointer",
    backgroundColor: "#555",
  },

  inputText:{
    position:"relative",
    top:"0px",
    width: "100%",
    padding: "12px 10px",
    margin: "4px" ,
    boxSizing: "border-box",
  },
  
  inputSubmit:{
    position:"relative",
    top:"0px",
    left:"10px",
    fontsize: "15px",
    verticalAlign: "middle",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  label:{
    position:"relative",
    top:"0px",
    float:"left",
    padding: "2px 2px 4px",
    display: "inline-block",
  },

  table:{
    position: "relative",
    overflow: "auto",
  },

  td:{
    position:"relative",
    left:"4px",
    border:"1px #C8C6C6",
    padding:" 3px 30px" ,
    backgroundColor:"#45a049",
    textAlign: "center",
    overflow: "auto",
  },

  td1:{
    position:"relative",
    left:"4px",
    border:"1px #C8C6C6",
    backgroundColor:"#FF0000",
    textAlign: "center",
    overflow: "auto",
  },

  th:{
    position:"relative",
    top:"0px",
    left:"4px",
    border:"1px #C8C6C6",
    padding:" 3px 30px" ,
    backgroundColor:"#5562",
    textAlign: "center",
    overflow: "auto",
    color:"black",
  },

  thead:{
    position:"relative",
    fontSize :40,
    left:"250px",
    textAlign: "center",
    overflow: "auto",
    color:"black",
  },

  thead1:{
    position:"relative",
    fontSize :40,
    left:"80px",
    textAlign: "center",
    overflow: "auto",
    color:"black",
  },
};

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.id = props.id;
  }
  async delete_all_entry(message) {
    const query = `mutation delete_all_entry($message:String!) {
      delete_all_entry(message: $message)
    }`;
    const result = await graphQLFetch(query, { message});
    if(result){
      this.props.updatePage();
      this.props.createIssue();
    }
  }
  handleClick(e) {
    if (this.id =="reset"){
      localStorage.clear();
      this.delete_all_entry(this.id);
      window.alert("Waitlist has been reset");
      this.props.createIssue();
      this.props.updatePage();
      location.reload() 
    }else{
      e.preventDefault();
      buttonStatus.active = this.props.id;
      this.props.createIssue();
    }
  }
  render() {
    return (
      <b onClick={this.handleClick} style={this.props.status}>{this.props.text}</b>
    ); 
  }
}


class NavigationBar extends React.Component{
  constructor() {
    super();
    this.createIssue = this.createIssue.bind(this);
    this.state = {current_button_status:buttonStatus};
  }
  createIssue() {
    this.setState({current_button_status:buttonStatus});
    this.props.updatePage()
  }
  render(){
    return (
      <div className="navigation_bar">
        <ul style={style.ul}>
          <a style={style.a}> Hotel California Waitlist System </a>
          <li style={style.li}><Button id="home" text="Homepage" createIssue={this.createIssue} status={buttonStatus.active == "home" ? style.bActive: style.b}></Button></li>
          <li style={style.li}><Button id="add" text="Add an entry" createIssue={this.createIssue} status={buttonStatus.active == "add" ? style.bActive: style.b}></Button></li>
          <li style={style.li}><Button id="remove" text="Remove an entry" createIssue={this.createIssue} status={buttonStatus.active == "remove" ? style.bActive: style.b}></Button></li>
          <li style={style.li}><Button id="reset" text="Reset the waitlist" createIssue={this.createIssue} updatePage={this.props.updatePage} status={buttonStatus.active == "reset" ? style.bActive: style.b}></Button></li>
          <li style={style.li}><Button id="show" text="Hide the components" createIssue={this.createIssue} status={buttonStatus.active == "show" ? style.bActive: style.b}></Button></li>
        </ul>
      </div>
    )
  }
};

class AddCustomer extends React.Component{
  constructor(props) {
    super(props);
    this.createIssue = this.createIssue.bind(this);
    this.state = {current_button_status:buttonStatus};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePage = props.updatePage;
  }

  async add_entry(entry) {
    const query = `mutation add_entry($entry: Entry_inputs!) {
      add_entry(entry: $entry) {
        serial_number
      }
    }`;
    await graphQLFetch(query, { entry });
  }
  createIssue() {
    this.setState({current_button_status:buttonStatus});
  }
  handleSubmit(e) {
    const form = document.forms.addEntry;
    var number = document.getElementById("add_entry_number").value;
    var name = document.getElementById("add_entry_name").value;
    var phone = document.getElementById("add_entry_phone").value;
    var time = document.getElementById("time").value;
    if ( number <= 0 || number > 25 || number == "" || name == "" || phone == ""|| time ==""){
      window.alert("invalid input!")
    }
    else if(localStorage.getItem(number)!=null){
      window.alert("The position is taken already!");
    }
    else{
      const record = {serial_number:parseInt(number),name:name, phone_number:phone,time_stamp:time};
      localStorage.setItem(number,{status:"taken"});
      this.add_entry(record);
    }
    form.reset();
    this.updatePage();
  }
  render(){
    var today = new Date();
    var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return (
      <div id="add_entry"  style={{display:this.props.status}}>
        <form name="addEntry" onSubmit={this.handleSubmit}>
          <label style={style.label}>Serial Number</label>
          <input style={style.inputText} type="text" name="number" id="add_entry_number" ></input>
          <label style={style.label}>Name</label>
          <input style={style.inputText} type="text" id="add_entry_name" ></input>
          <label style={style.label}>Phone Number</label>
          <input style={style.inputText} type="text" id="add_entry_phone" ></input>
          <label style={style.label}>Time Stamp</label>
          <input style={style.inputText} type="text" id="time" defaultValue={time}></input>
          <input style={style.inputSubmit} type="submit" id="add_entry_submit" value="Submit"></input>
        </form>
      </div>
    )
  }
};

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      }
    }
    return result.data;
  } catch (e) {
  }
}

class DeleteCustomer extends React.Component{
  constructor(props) {
    super(props);
    this.createIssue = this.createIssue.bind(this);
    this.state = {current_button_status:buttonStatus};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePage = props.updatePage;
  }
  createIssue() {
    this.setState({current_button_status:buttonStatus});
    this.updatePage();
  }
  async delete_entry(delete_entry) {
    const query = `mutation delete_entry($delete_entry: Delete_inputs!) {
      delete_entry(delete_entry: $delete_entry)
    }`;
    await graphQLFetch(query, { delete_entry});
  }
  handleSubmit(e) {
    const form = document.forms.removeEntry;
    var number = document.getElementById("remove_entry_number").value;
    if ( number <= 0 || number > 25 || number == ""){
      window.alert("invalid input!")
    }
    else if(localStorage.getItem(number)==null){
      window.alert("The position is empty. Invalid removal!");
    }
    else{
      localStorage.removeItem(number);
      const delete_entry = {serial_number:parseInt(number)}
      this.delete_entry(delete_entry);
      window.alert("Successfully remove entry of number " + number);
    }

    form.reset();
    this.updatePage();
  }
  render(){
    return (
      <div id="remove_entry" style={{display:this.props.status }} >
        <form name="removeEntry" onSubmit={this.handleSubmit}>
          <label style={style.label}>Serial Number</label>
          <input style={style.inputText} type="text" id="remove_entry_number"></input>
          <input style={style.inputSubmit} type="submit" id="remove_entry_submit" value="Submit"></input>
        </form>
      </div>
    )
  }
};

class DisplayCustomer extends React.Component{
  constructor(props) {
    super(props);
    this.createIssue = this.createIssue.bind(this);
    this.state = {current_button_status:buttonStatus,issues:null};
    this.datas =[];
  }
  createIssue() {
    this.setState({current_button_status:buttonStatus});
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const query = `query {
      read_entry_list {
        serial_number name phone_number time_stamp
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      if (data.read_entry_list.length!=0){
        this.setState({ issues:data.read_entry_list});
      }
    }else{
      this.setState({ issues:null})
    }
  }
  
  render(){
    if(this.state.issues!=null) {
      const WaitlistRows = this.state.issues.map(issue =>
        <WaitlistRow key={issue.serial_number} issue={issue} />
      );
      return (
        <div id="show_list" style={{display:this.props.status, float:"left" }}>
          <table style={style.table} id="show_list_table" >
            <thead>
              <tr>
                <th style={style.thead}> Waitlist Table </th>
              </tr>
              <tr >
                <th style={style.th}>Serial No.</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Phone Number</th>
                <th style={style.th}>Time Stamp</th>
              </tr >
            </thead>
            <tbody>
            {WaitlistRows}
            </tbody>
          </table>
        </div>
      )
    }else{
      return (
        <div id="show_list" style={{display:this.props.status, float:"left" }}>
          <table style={style.table} id="show_list_table" >
            <thead>
              <tr>
                <th style={style.thead}> Waitlist Table </th>
              </tr>
              <tr >
                <th style={style.th}>Serial No.</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Phone Number</th>
                <th style={style.th}>Time Stamp</th>
              </tr >
            </thead>
            <tbody>
            {}
            </tbody>
          </table>
        </div>
      )
    }
  }
};


class WaitlistRow extends React.Component {
  render() {
    const issue = this.props.issue;
    var number = issue.serial_number;
    var name = issue.name;
    var phone = issue.phone_number;
    var time = issue.time_stamp;
    return (
      <tr>
        <th style={style.td1}>{number}</th>
        <th style={style.td1}>{name}</th>
        <th style={style.td1}>{phone}</th>
        <th style={style.td1}>{time}</th>
      </tr>
    );
  }
}

class DisplayHomepage extends React.Component{
  constructor() {
    super();
    this.createIssue = this.createIssue.bind(this);
    this.state = {current_button_status:buttonStatus};
  }
  createIssue() {
    this.setState({current_button_status:buttonStatus});
  }
  render(){
    var freeslots = [];
    for (var i=1;i<26;i++){
      if (localStorage.getItem(i) == null){
        freeslots.push(i);
      }
    }
    const FreeslotsRows = freeslots.map(freeslot =>
      <FreeslotRow key={freeslot} data={freeslot} />
    );
    return (
      <div id="home_page" style={{display:this.props.status, float:"right" }}>
        <table style={style.table} id="show_slots_table" >
          <thead>
            <tr>
              <th style={style.thead1}> Free slots </th>
            </tr>
            <tr >
              <th style={style.th}>Serial No.</th>
              <th style={style.th}>Status</th>
            </tr>
          </thead>
          <tbody>
          {FreeslotsRows}
          </tbody>
        </table>
      </div>
    )
  }
};

class FreeslotRow extends React.Component {
  render() {
    var number = this.props.data;
    var status = "Available";
    return (
      <tr>
        <th style={style.td}>{number}</th>
        <th style={style.td}>{status}</th>
      </tr>
    );
  }
}

class TopDummyComponent extends React.Component {
  constructor() {
    super();
    this.state = { issues: [], current_button_status:buttonStatus};
    this.createIssue = this.createIssue.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  updatePage(){
    this.setState({current_button_status:buttonStatus});
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues });
    }, 500);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar updatePage={this.updatePage} />
        <DisplayHomepage updatePage={this.updatePage} status={buttonStatus.active == "home" ? "block": "none"} />
        <AddCustomer updatePage={this.updatePage} status={buttonStatus.active == "add" ? "block": "none"}/>
        <DeleteCustomer updatePage={this.updatePage} status={buttonStatus.active == "remove" ? "block": "none"}/>
        <DisplayCustomer updatePage={this.updatePage} status={buttonStatus.active == "home" ? "block": "none"}/>
      </React.Fragment>
    );
  }
}

const buttonStatus = {active:"home"}
const element = <TopDummyComponent />;
ReactDOM.render(element, document.getElementById('contents'));
