import styles from '../styles/Home.module.scss'
import Request from '../models/Request'
import dbConnect from '../lib/dbConnect'

export default function Example({ all }) {
  //write something to change this to pick a random request to show
  const randomExample = all[Math.floor(Math.random() * all.length)]
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Example</h1>
      <div></div>
      <p className={styles.description}>
        A quick example of how to use this tool and what it does.
      </p>

      <h2>Inputs</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Company</h2>
          <p>Vercel</p>
        </div>
        <div className={styles.card}>
          <h2>Position</h2>
          <p>Junior Developer</p>
        </div>
        <div className={styles.card}>
          <h2>Company Highlights</h2>
          <p>
            Company with the fastest and most developer friendly deployment in
            all of web development.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Job Listing</h2>
          <p>
            Work with a team to build web applications that are user focused.
            Integrate systems.
          </p>
        </div>
      </div>
      <div>
        <h2>Outputs</h2>
        <div className={styles.card}>
          <h2>Cover Letter</h2>

          <p className={styles.wide}>
            Sofia Flores (123) 456 7891 sflores@email.com May 1, 2018 Dear
            Hiring Manager, I&#39;m excited to be applying for the Software
            Developer position at Cloud Clearwater. With software development,
            there is always something new to discover. Designing a program that
            is truly helpful to the user is my ultimate goal on every project,
            and I am delighted by the opportunity to apply my knowledge at Cloud
            Clearwater, a top provider of cloud services. During my previous
            role at River Tech, I provided support for a role-oriented parts
            management system that allowed the users to track parts, jobs,
            tasks, statistics and other job and employee data. This system is
            utilized by an Air Force depot to track all progress on the parts
            and labor required to repair and supply airplanes. As part of my
            duties, I provided enhancements to the program and also provided
            immediate solutions to unexpected problems. When I was appointed to
            design an online version of the hardcopy workbook used by the
            maintenance and repair technicians for job tracking, I successfully
            led the team in certain tasks and followed direction from the team
            leader for other requirements. The implementation of the online
            workbook resulted in a 25% faster completion time for measurable
            tasks the following year. Thank you for your time and consideration.
            I&#39;m looking forward to learning more about the Software
            Developer position and about Cloud Clearwater. As a Software
            Developer, my goal is to continually increase my programming skills
            in order to present better solutions to my employers and their
            clients. I enjoy uncovering new ideas and would use them to advance
            Cloud Clearwater&#39;s mission to deliver viable solutions for
            digital storage. Sincerely, Sofia Flores
          </p>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  //get a random request from the database and return it to the page using props in nextjs
  await dbConnect()
  const requests = await Request.find({})
  console.log(requests, 'this is the random request')

  return {
    props: {
      all: JSON.parse(JSON.stringify(requests)),
    },
  }
}
