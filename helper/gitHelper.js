/***
 
  //GIT HANDLER :

    // REGULAR ACTIVITY TO SEE CHANGES IN REMOTE/MAIN BRANCH :
    
      • Make changes in the local/main or local/metta branch 
      • If it is in local/main then no problem, otherwise merge the changes in local/metta with the local/main 
      • Now the local/main is up-to-date with all the changes made on that day
      • Now push the changes from the local/main to the remote/metta branch by using the " git push origin main: metta  "  command
      • Now all the changes would have been updated to the remote/metta branch
      • Then make a pull request to the main branch to merge the changes in the remote/metta branch with the remote/main branch
      • After accepting and merging the pull request the remote/main branch will be up-to-date with the changes
      
      
    PROBLEM : If the remote/metta branch is some branches behind the remote/main branch then  follow the steps: 
    
    // TO SOLVE THE ABOVE MENTIONED PROBLEM :
      • After the regular steps if any remote branches other than the main branch lag some branches or some branches behind the remote/main branch
      • Then pull the changes in the remote/main branch  to the local/metta branch 
      • Now push the changes from the local/metta branch to the remote/metta branch using the " git push origin metta: metta " command
      • So that all the changes in the remote/metta will be up to the remote/main
      • At last run " git pull origin main" in the local/main branch to make sure the origin/head is in the local/main branch

 ***/
