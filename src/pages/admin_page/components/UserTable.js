import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


  const UserTable = (props) => (
      <Card>
          <Row>
              <Col md={12}>
                  <CardTitle title="User Table" />
                  <CardText>
                      <div>
                        <Table
                          height={props.config.height}
                          fixedHeader={props.config.fixedHeader}
                          fixedFooter={props.config.fixedFooter}
                          selectable={props.config.selectable}
                          multiSelectable={props.config.multiSelectable}
                        >
                          <TableHeader
                            displaySelectAll={props.config.showCheckboxes}
                            adjustForCheckbox={props.config.showCheckboxes}
                            enableSelectAll={props.config.enableSelectAll}
                          >
                            <TableRow>
                              <TableHeaderColumn colSpan="3" tooltip="User Table" style={{textAlign: 'center'}}>
                                User Table
                              </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                              <TableHeaderColumn tooltip="The Username">Username</TableHeaderColumn>
                              <TableHeaderColumn tooltip="Email Address">Email</TableHeaderColumn>
                            </TableRow>
                          </TableHeader>
                          <TableBody
                            displayRowCheckbox={props.config.showCheckboxes}
                            deselectOnClickaway={props.config.deselectOnClickaway}
                            showRowHover={props.config.showRowHover}
                            stripedRows={props.config.stripedRows}
                          >
                            {props.users.map( (row, index) => (
                              <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.username}</TableRowColumn>
                                <TableRowColumn>{row.email}</TableRowColumn>
                              </TableRow>
                              ))}
                          </TableBody>
                          <TableFooter
                            adjustForCheckbox={props.config.showCheckboxes}
                          >
                            <TableRow>
                              <TableRowColumn>ID</TableRowColumn>
                              <TableRowColumn>Username</TableRowColumn>
                              <TableRowColumn>Email</TableRowColumn>
                            </TableRow>
                            <TableRow>
                              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                                User Table Footer
                              </TableRowColumn>
                            </TableRow>
                          </TableFooter>
                        </Table>



                      </div>
                  </CardText>
                  <CardActions>
                      <div>
                          <RaisedButton
                            label="Table Config"
                            onTouchTap={props.handleToggleConfig}
                          />
                          <Drawer docked={false} open={props.config.openConfig} onRequestChange={props.handleCloseConfig}>
                              <div style={styles.propContainer}>
                                <h3>Table Properties</h3>
                                <TextField
                                  floatingLabelText="Table Body Height"
                                  defaultValue={props.config.height}
                                  onChange={props.handleChange}
                                />
                                <Toggle
                                  name="fixedHeader"
                                  label="Fixed Header"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.fixedHeader}
                                />
                                <Toggle
                                  name="fixedFooter"
                                  label="Fixed Footer"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.fixedFooter}
                                />
                                <Toggle
                                  name="selectable"
                                  label="Selectable"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.selectable}
                                />
                                <Toggle
                                  name="multiSelectable"
                                  label="Multi-Selectable"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.multiSelectable}
                                />
                                <Toggle
                                  name="enableSelectAll"
                                  label="Enable Select All"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.enableSelectAll}
                                />
                                <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
                                <Toggle
                                  name="deselectOnClickaway"
                                  label="Deselect On Clickaway"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.deselectOnClickaway}
                                />
                                <Toggle
                                  name="stripedRows"
                                  label="Stripe Rows"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.stripedRows}
                                />
                                <Toggle
                                  name="showRowHover"
                                  label="Show Row Hover"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.showRowHover}
                                />
                                <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
                                <Toggle
                                  name="showCheckboxes"
                                  label="Show Checkboxes"
                                  onToggle={props.handleToggle}
                                  defaultToggled={props.config.showCheckboxes}
                                />
                              </div>
                          </Drawer>
                      </div>
                  </CardActions>
              </Col>
          </Row>
      </Card>
    );
  export default UserTable
