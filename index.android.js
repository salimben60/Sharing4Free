/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    Image,
    ListView,
    StyleSheet,
    Text,   
    Alert,
    View,
    TouchableHighlight,//Button
} from 'react-native';

var Button = require('react-native-button');

//Add the files over here
var file1 = require('./file1');

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true
                });
            })
            .done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }
    onPress(){

    }
    renderMovie(movie) {
        var alertMessage =  'Button Pressed! Good Job! ';
        var alertMessage1 =  'Button Pressed! Good Job! ';

        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}
                />
                <Button
                    style={{fontSize: 14, color: 'green'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => Alert.alert( 'Alert Title', alertMessage)}>
                    Press Me!
                </Button>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );

    }
   //Change alertMessage to function that will call another page! TBD  3-19
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009999'
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    year: {
        textAlign: 'center'
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF'
    },
    button:{
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

/*
module.exports = file1;*/
