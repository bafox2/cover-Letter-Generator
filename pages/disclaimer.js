import styles from '../styles/Home.module.scss'
import { mdiAlertOutline } from '@mdi/js'
import { Icon } from '@mdi/react'

export default function Disclaimer() {
  return (
    <div className={styles.container}>
      <h1>Disclaimer</h1>
      <p>
        This is a fun project to dip my toes into tech that captivates me. Check
        your cover letter and use it as an inspiration. You are interacting with
        an AI system, and it will not write a perfect letter for you. It does
        not understand the things that make you such a great candidate. OpenAI
        allows the public to use their GPT-3 API and it is our duty to use it
        responsibly.
      </p>
      <Icon path={mdiAlertOutline} size={3} color="red" />
    </div>
  )
}
