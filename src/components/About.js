import React from 'react'

const About = () => {
  return (
    <div className='container '>
      <h1 className='text-center mb-3'>About iNotebook</h1>
      <p className='my-3'>
        iNotebook is a note making app. All users when they login or signup using correct credentials will see their notes after successful login. If the user does not have the correct authentication they will never log in and they will not be able to view their notes data. Users only need to login if the user already exists and they will see their data of notes. After successful login, the user can add notes as well as delete and update them.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec utegestas mauris. Maecenas leo mauris, accumsan vel velit ac, blandit lobortis est. Vivamus in erat ac magna faucibus placerateget non ligula Aliquam consequat rhoncus turpis a convallis.Pellentesque ac sapien rhoncus, congue nibh eget, finibus turpis.
        Aenean volutpat malesuada augue, at lacinia dolor volutpat congue. Ut sit amet nunc ac arcu imperdiet iaculis. Mauris sit amet quam ut nisi blandit blandit congue nec lorem. Mauris viverra, quam non
        aliquet pellentesque, lorem risus fermentum mi, a mollis turpis velit vitae nulla. Proin auctor, elit a rhoncus vulputate, estmagna facilisis ipsum, non mattis sem odio in neque. Cras atultricies eros. Ut risus turpis, consequat sed auctor nec, rutrumid mauris.
      </p>
      <button className='btn btn-primary'>Read More</button>
    </div>
  )
}

export default About
