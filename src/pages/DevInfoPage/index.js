import { UilAngleLeftB, UilBars, UilSearch } from '@iconscout/react-unicons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavMenu from '../../components/NavMenu'
import RealTime from '../../RealTime'
import styles from './DevInfoPage.module.scss'

function DevInfoPage() {
   const { user } = useSelector(state => state.userReducer.userData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

   const [showMenu, setShowMenu] = useState(false)

   return (
      <div className={styles.DevInfoPage}>
         <nav className={styles.navBar}>
            <div className={styles.logoSearch}>
               <img className={styles.logo} src={serverPublic + 'logo.png'} alt='logo' />
               <div className={styles.inputWrap}>
                  <input className={styles.searchInput} type='text' placeholder='Search...' />
                  <div className={styles.searchBtn}>
                     <UilSearch />
                  </div>
               </div>
            </div>

            <div className={styles.navRight}>
               <div className={`${styles.navIcon} icon`}>
                  <UilAngleLeftB />
               </div>

               {user && (
                  <img
                     className={styles.image}
                     src={serverPublic + (user.avatar || 'defaultAvatar.png')}
                     alt='avatar'
                  />
               )}
               <span>{user?.username}</span>

               <div className={`${styles.navIcon} icon`} onClick={() => setShowMenu(!showMenu)}>
                  <UilBars />
               </div>

               {showMenu && <NavMenu setShowMenu={setShowMenu} />}
            </div>
         </nav>
         <div className={styles.contentBody}>
            <div className={styles.contentLeft}>
               <div className={styles.basicInfo}>
                  <div>
                     <div>
                        <img src={serverPublic + (user.avatar || 'defaultAvatar.png')} alt='' />
                     </div>
                     <h2>Nguyen Anh Khoa</h2>
                  </div>
                  <div>
                     <p>
                        <span style={{ color: '#108a00' }}>Upwork: </span>
                        <a
                           target='_blank'
                           rel='noreferrer'
                           href='https://www.upwork.com/freelancers/~01d34f5041e862cc16'
                        >
                           Anh Khoa N.
                        </a>
                     </p>
                     <p>
                        <span style={{ color: '#0093d0' }}>Freelancer: </span>
                        <a target='_blank' rel='noreferrer' href='https://www.freelancer.com/u/PiPix5'>
                           @PiPix5
                        </a>
                     </p>
                     <p>
                        <span style={{ color: '#4fc785' }}>Fiverr: </span>
                        <a target='_blank' rel='noreferrer' href='https://www.fiverr.com/nakmiers'>
                           nakmiers
                        </a>
                     </p>
                  </div>
                  <div>
                     <p>
                        <span>Birthday:</span> 14/09/2004
                     </p>
                     <p>
                        <span>Gender:</span> Male
                     </p>
                     <p>
                        <span>Status:</span> In Relationship
                     </p>
                     <p>
                        <span>Country:</span> Vietnam - local: <RealTime />
                     </p>
                     <p>
                        <span>Live:</span> Ho Chi Minh City
                     </p>
                  </div>
               </div>

               <div className={styles.moreInfo}>
                  <p>
                     <span>Education:</span> Ho Chi Minh City University of Foreign Languages and
                     Information Technology
                  </p>
                  <p>
                     <span>Languages:</span> English - Converation, Vietnamese - Navtive
                  </p>
               </div>
            </div>

            <div className={styles.contentRight}>
               <div className={styles.generalInfo}>
                  <h1>FULL STACK DEVELOPMENT</h1>
                  <h3>-Custom website on demand-</h3>
                  <br />
                  <div>
                     <article>
                        Hello,
                        <br />
                        I am a Full Stack Developer with expertise in Node.js, React.js, Express.js, and
                        Font-End Development with over 3000 hours of experience on top Frameworks in the
                        world. I am committed to providing appropriate, professional, and timely updated
                        solutions to you with the most enthusiasm and professionalism possible. My skills
                        include a variety of business aspects, ensuring the necessary needs for your
                        satisfaction and both your customers.
                        <br />
                        <br />
                        I have experience in reliable development technologies:
                        <br />
                        <br />
                        ✅ React JS, React-Router, Redux-Saga, Redux Thunk
                        <br />
                        ✅ Builders (Elementor, Visual Composer, Beaver)
                        <br />
                        ✅ Theme Development (Material UI, Flat UI, Metro UI)
                        <br />
                        ✅ PSD to HTML / Bootstrap
                        <br />
                        ✅ Responsive Web Design, SEO, Page Speed ​​Optimization
                        <br />
                        ✅ Git (Github, Bitbucket, GitLab)
                        <br />
                        ✅ Web Servers (Epxress.js, Node.js, MongoDB, Template Engine)
                        <br />
                        ✅ Deployment (Heroku, Netlify, Firebase)
                        <br />
                        <br />
                        Front-End Skills:
                        <br />
                        <br />
                        ✅ React.js, Bootstrap, JavaScript, CSS Preprocessor(SCSS, SASS)
                        <br />
                        ✅ Material Design, Flat Design, Metro Design
                        <br />
                        ✅ Responsive Web Design.
                        <br />
                        ✅ Adobe Photoshop
                        <br />
                        <br />
                        I Implement Web Applications and Restful Apis Using Node.js & Express.js
                        <br />
                        <br />
                        I Comprise The Delivering Unique and Web 2.0 Design Solutions Including Both
                        Custom Web Design and CMS Design Services. My Design Solutions are Compliant with
                        W3C Standards.
                        <br />
                     </article>
                  </div>
               </div>
               <div className={styles.skillInfo}>
                  <h3>Skills</h3>

                  <div>Responsive Design</div>
                  <div>HTML</div>
                  <div>SCSS</div>
                  <div>CSS</div>
                  <div>JavaScript</div>
                  <div>React</div>
                  <div>Redux</div>
                  <div>MongoDB</div>
                  <div>ExpressJS</div>
                  <div>Bootstrap</div>
                  <div>Material Design</div>
                  <div>Full-Stack Development</div>
                  <div>API</div>
                  <div>Redux Saga</div>
                  <div>NodeJS Framework</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DevInfoPage
