import React, { Component } from "react";
import MemberList from "./MemberList.js";
import Member from "./Member.js";
import TrainingTypes from "./TrainingTypes.js";
import axios from "axios";
import TrainingDate from "./TrainingDate.js";
class Training extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTraining: true,
      trainingData: [],
      allMembers: [],
      trainingMembers: [],
      showData: false,
      token: sessionStorage.getItem("autHeader"),
      newTraining: this.checkNewTraining(),
      isTrainer: false,
      newDate: null,
      trainingTypes: null,
      trainingType: null,
    };
    this.presentList = React.createRef();
    this.absentList = React.createRef();
    this.newTrainer = React.createRef();
  }
  componentDidMount() {
    this.setState({ trainingData: this.props.value });
    if (this.props.members !== "none") {
      this.setState({ trainingMembers: this.props.members });
    }
    this.getRequest(this.state.token, "members", "allMembers");
    this.getRequest(this.state.token, "trainings/types", "trainingTypes");
  }
  getRequest = (token, page, stateKeyString) => {
    const url = "http://85.214.202.103:8081/".concat(page);
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        this.setState({ [stateKeyString]: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  postRequest = (token, page, object) => {
    const url = "http://85.214.202.103:8081/".concat(page);
    axios
      .post(url, object, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  putRequest = (token, page, object) => {
    const url = "http://85.214.202.103:8081/".concat(page);
    axios
      .put(url, object, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  deleteRequest = (token, page, id) => {
    const url = "http://85.214.202.103:8081/".concat(page);
    axios
      .delete(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  switchVisibleData = () => {
    this.setState((prevState) => ({
      showData: !prevState.showData,
    }));
  };
  postTraining = () => {
    const training = this.prepareTraining(null);
    this.postRequest(this.state.token, "trainings", training);
  };
  putTraining = () => {
    const training = this.prepareTraining(this.state.trainingData.id);
    console.log(this.state.trainingData.id);
    this.putRequest(
      this.state.token,
      "trainings/" + this.state.trainingData.id,
      training
    );
  };
  deleteTraining = () => {
    this.deleteRequest(
      this.state.token,
      "trainings/" + this.state.trainingData.id,
      this.state.trainingData.id
    );
    this.setState({ showTraining: false });
  };
  prepareTraining = (id) => {
    const training = {
      id: id,
      date: this.state.newDate,
      trainerName: this.newTrainer.current.value,
      senderName: this.newTrainer.current.value,
      type: !this.state.trainingType
        ? this.state.trainingTypes[0]
        : this.state.trainingType,
      members: this.state.trainingMembers,
    };
    return training;
  };

  checkNewTraining = () => {
    if (this.props.members === "none") {
      return true;
    } else {
      return false;
    }
  };
  //add Member to trainingMembers if it isnt present yet
  addMember = (member) => {
    if (
      this.state.trainingMembers.filter(function (e) {
        return e.id === member.id;
      }).length === 0
    ) {
      var newList = this.state.trainingMembers.concat(member);
      this.setState((prevState) => ({
        trainingMembers: prevState.trainingMembers.concat(member),
      }));
      this.presentList.current.changeMembers(newList);
    }
  };
  removeMember = (member) => {
    const newList = this.state.trainingMembers.filter(function (e) {
      return e.id !== member.id;
    });
    this.setState({
      trainingMembers: newList,
    });
    this.presentList.current.changeMembers(newList);
  };
  checkTrainer = (member) => {
    if (this.state.trainingData) {
      if (
        this.state.trainingData.trainerName ===
        member.firstName + " " + member.lastName
      ) {
        return true;
      }
    }
  };
  setTrainers = () => {
    var trainers = [];
    this.state.allMembers.map((member) =>
      member.isTrainer ? (trainers = trainers.concat(member)) : null
    );
    return trainers;
  };
  dateChange = (date) => {
    console.log(date);
    this.setState({ newDate: date });
  };
  setTrainingType = (type) => {
    this.setState({ trainingType: type.toUpperCase() });
  };
  render() {
    const trainers = this.setTrainers();
    const isNewTraining = this.state.newTraining;
    return this.state.showTraining ? (
      <div className="training">
        <button
          className="btn-secondary btn-lg btn-block"
          onClick={() => this.switchVisibleData()}
          style={this.state.showData ? { backgroundColor: "#313131" } : null}
        >
          {this.state.showData ? (
            <span className="toggle">v</span>
          ) : (
            <span className="toggle">></span>
          )}
          training {isNewTraining ? "nieuw +" : this.state.trainingData.date}
        </button>
        {this.state.showData ? (
          <React.Fragment>
            <div class="row row-custom">
              <div class="col col-custom">
                <br />
                <MemberList
                  title="Alle leden"
                  present={false}
                  getPresentMember={this.removeMember}
                  getAbsentMember={this.addMember}
                  value={this.state.allMembers}
                  className="list-group"
                  training={true}
                ></MemberList>
                <br />
              </div>
              <div class="col">
                <br />
                <MemberList
                  ref={this.presentList}
                  title="Aanwezige leden"
                  present={true}
                  getPresentMember={this.removeMember}
                  getAbsentMember={this.addMember}
                  className="memberList"
                  value={this.state.trainingMembers}
                  training={true}
                ></MemberList>
              </div>
              <div class="col col-custom">
                <div className="trainingInfo">
                  <div className="form-group">
                    <label for="trainerlbl">
                      <b>Trainer:</b>
                    </label>
                    <select ref={this.newTrainer} className="form-control">
                      {trainers.map((member) => (
                        <Member
                          className="trainerOption"
                          value={member}
                          selected={this.checkTrainer(member)}
                          key={member.id}
                        ></Member>
                      ))}
                    </select>
                  </div>
                  {isNewTraining ? (
                    <React.Fragment>
                      <TrainingTypes
                        values={this.state.trainingTypes}
                        getType={this.setTrainingType}
                        listType="optionList"
                      ></TrainingTypes>
                      <b>Datum:</b>
                      <TrainingDate
                        newTraining={isNewTraining}
                        dateChange={this.dateChange}
                      ></TrainingDate>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <TrainingTypes
                        values={this.state.trainingTypes}
                        getType={this.setTrainingType}
                        listType="optionList"
                        type={this.state.trainingData.type}
                      ></TrainingTypes>
                      <b>Datum:</b>
                      <TrainingDate
                        newTraining={isNewTraining}
                        value={this.state.trainingData.date}
                        dateChange={this.dateChange}
                      ></TrainingDate>
                    </React.Fragment>
                  )}
                </div>
                <div className="trainingButtons">
                  <div className="btn-group-justified">
                    {isNewTraining ? (
                      <button
                        className="changesTrainingButton btn-md-2 btn-secondary btn-sm"
                        onClick={this.postTraining}
                      >
                        Opslaan &nbsp;
                      </button>
                    ) : (
                      <React.Fragment>
                        <button
                          className="btn-md-2 btn-secondary btn-sm "
                          onClick={this.putTraining}
                        >
                          Wijzigingen opslaan
                        </button>
                        &nbsp;
                        <button
                          className="btn-md-2 btn-secondary btn-sm"
                          onClick={this.deleteTraining}
                        >
                          Training verwijderen
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    ) : null;
  }
}

export default Training;
