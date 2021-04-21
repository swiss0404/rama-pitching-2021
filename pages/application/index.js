import Head from 'next/head'
import firebase from '../../components/firebase'
import Application from '../../components/application'
import { withTranslation } from '../../i18'

const ApplicationPage = ({ t }) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
      if (typeof (window) !== 'undefined') {
        window.location.replace('/')
      }

    }
  })
  return (
    <div>
      <nav className="navbar navbar-light bg-white py-3" style={{ borderBottom: 'solid 1px #e5e7eb' }}>
        <div className='container'>
          <h4 className='mb-0'>
            {t('register-header')}
          </h4>
          <button onClick={async () => await firebase.auth().signOut()} className='btn btn-icon text-muted'>
            <span className='material-icons'>logout</span> {t('logout')}
          </button>
        </div>
      </nav>
      <div className='bg-dark page-wrapper'>
        <Application />
      </div>
    </div>
  )
}
export async function getServerSideProps({ res, params }) {
  res.statusCode = 302
  var now = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok'
  })
  now = new Date(now)
  const closeAt = new Date('2021-04-30T18:00:00.000Z')
  if (now > closeAt) {
    res.setHeader('Location', `/application/closed`)
  }

  return { props: {} }
}


export default withTranslation('common')(ApplicationPage)
