import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE } from 'react-native-map-clustering';

export default class index extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get('https://eonet.gsfc.nasa.gov/api/v2.1/events', { timeout: 5000 })
      .then((res) => {
        this.setState({
          events: res.data.events,
          loading: false,
        });
        console.log(res.data.events);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false }); // Set loading to false even in case of error
      });
  }

  handleClusterPress = (cluster, markers) => {
    // Handle cluster press event
  };

  renderCluster = (cluster, onPress) => {
    // Custom cluster rendering logic
  };

  render() {
    const { loading, events } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🔥YÜKLENİYOR...</Text>
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 52.5,
              longitude: 19.2,
              latitudeDelta: 8.5,
              longitudeDelta: 8.5,
            }}
            style={styles.map}
            clusteringEnabled={true}
            onClusterPress={this.handleClusterPress}
            renderCluster={this.renderCluster}
          >
            {events.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.geometries[0].coordinates[1],
                  longitude: item.geometries[0].coordinates[0],
                }}
                title={item.title}
                description={item.description}
              >
                <View style={styles.markerView}>
                  <Text style={styles.markerText}>🔥</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 40,
  },
  map: {
    flex: 1,
  },
  markerView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 35,
    color: 'white',
  },
});
