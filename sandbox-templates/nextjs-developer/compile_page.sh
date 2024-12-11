#!bin/bash
export  NEXT_PUBLIC_POSTHOG_KEY=""
export NEXT_PUBLIC_POSTHOG_HOST=""


function ping_server(){
    counter=0
    response=$(curl -s -0 /dev/null -w "%{http_code}" "https://localhost:3000")

    while [[${response} -ne 200]]; do
        let counter ++
         if((counter%20) ==0); then
            echo "waiting for server to start..."
            sleep 0.1
        fi 
        response=$(curl -s -0 /dev/null -w "%{http_code}" "https://localhost:3000")
    done

}

ping_server &
cd /home/usr  && npx next --turbo

