import { Grid, Card } from "@material-ui/core";
import { WarningOutlined } from "@material-ui/icons";
import React from "react";
import styles from '../../styles/Global.module.scss'

const WarningApi = () => {
	return (
		<Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{
          height: '80vh'
        }}
      >
        <Grid item>
          <Card className={styles.alert__no_content}>
            <div>
              <WarningOutlined style={{ fontSize: 40 }} />
            </div>
            <p><strong>API is down!</strong></p>
          </Card>
        </Grid>
      </Grid>
	)
}

export default WarningApi;