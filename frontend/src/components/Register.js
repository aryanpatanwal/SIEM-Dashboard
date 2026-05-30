import { useState } from 'react';

function Register({ setShowRegister }) {

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleRegister =
    async () => {

      try {

        const response =
          await fetch(
            `${process.env.REACT_APP_API_URL}/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json'
              },
              body: JSON.stringify({
                username,
                email,
                password
              })
            }
          );

        const data =
          await response.json();

        alert(data.message);

        if (
          data.message ===
          'User registered successfully'
        ) {

          setShowRegister(false);

        }

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background:
        'linear-gradient(to bottom right, #020617, #0f172a)',
      color: 'white'
    }}>

      <div style={{
        backgroundColor: '#111827',
        padding: '50px',
        borderRadius: '20px',
        width: '430px',
        border: '1px solid #334155',
        boxShadow:
          '0 0 40px rgba(59,130,246,0.15)'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px'
        }}>

          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '18px',
            backgroundColor:
              'rgba(239,68,68,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <span style={{
              fontSize: '34px'
            }}>
              🛡️
            </span>

          </div>

        </div>

        <h1 style={{
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          Create Account
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginBottom: '35px',
          fontSize: '14px'
        }}>
          Create your SIEM dashboard account
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '10px',
            border:
              '1px solid #475569',
            backgroundColor:
              '#334155',
            color: 'white',
            fontSize: '15px',
            outline: 'none',
            boxSizing:
              'border-box'
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '10px',
            border:
              '1px solid #475569',
            backgroundColor:
              '#334155',
            color: 'white',
            fontSize: '15px',
            outline: 'none',
            boxSizing:
              'border-box'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '25px',
            borderRadius: '10px',
            border:
              '1px solid #475569',
            backgroundColor:
              '#334155',
            color: 'white',
            fontSize: '15px',
            outline: 'none',
            boxSizing:
              'border-box'
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor:
              '#ef4444',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Register
        </button>

        <p
          onClick={() =>
            setShowRegister(false)
          }
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#60a5fa',
            cursor: 'pointer'
          }}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  );

}

export default Register;