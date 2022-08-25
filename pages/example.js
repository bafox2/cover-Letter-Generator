import styles from '../styles/Home.module.scss'

export default function Example() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Example</h1>

        <p className={styles.description}>
          A quick example of how to use this tool and what it does.
        </p>

        <h2>Inputs</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Strengths</h2>
            <p>
              Hard worker. Fast learner. Good communicator. Domain knowledge.
              Creativity.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Company Highlights</h2>
            <p>
              Good culture. Ethics. Open-minded. Developer oriented. Mentorship
              programs.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Writing Sample</h2>
            <p>
              Openai is a great tool to use for machine learning, and a fountain
              of inspiration for possibilities in the future.
            </p>
          </div>
        </div>
        <div>
          <h2>Outputs</h2>
          <div className={styles.card}>
            <h2>Cover Letter</h2>
            <p className={styles.wide}>
              Sofia Flores (123) 456 7891 sflores@email.com May 1, 2018 Dear
              Hiring Manager, I'm excited to be applying for the Software
              Developer position at Cloud Clearwater. With software development,
              there is always something new to discover. Designing a program
              that is truly helpful to the user is my ultimate goal on every
              project, and I am delighted by the opportunity to apply my
              knowledge at Cloud Clearwater, a top provider of cloud services.
              During my previous role at River Tech, I provided support for a
              role-oriented parts management system that allowed the users to
              track parts, jobs, tasks, statistics and other job and employee
              data. This system is utilized by an Air Force depot to track all
              progress on the parts and labor required to repair and supply
              airplanes. As part of my duties, I provided enhancements to the
              program and also provided immediate solutions to unexpected
              problems. When I was appointed to design an online version of the
              hardcopy workbook used by the maintenance and repair technicians
              for job tracking, I successfully led the team in certain tasks and
              followed direction from the team leader for other requirements.
              The implementation of the online workbook resulted in a 25% faster
              completion time for measurable tasks the following year. Thank you
              for your time and consideration. I'm looking forward to learning
              more about the Software Developer position and about Cloud
              Clearwater. As a Software Developer, my goal is to continually
              increase my programming skills in order to present better
              solutions to my employers and their clients. I enjoy uncovering
              new ideas and would use them to advance Cloud Clearwater's mission
              to deliver viable solutions for digital storage. Sincerely, Sofia
              Flores
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
